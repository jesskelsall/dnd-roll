import Joi from 'joi'
import { D100_METHOD_DEFAULT, POLYHEDRAL_SIDES } from '../../../consts'
import { DiceNotationError } from '../../../equation/errors/DiceNotationError'
import { rollDiceNotation } from '../../../equation/roll'
import { RollModifier } from '../../../roll/types'

const rollDiceNotationWithParts = (equationParts: string[]) => rollDiceNotation(
  equationParts,
  null,
  D100_METHOD_DEFAULT,
)

const rollSchema = Joi.number().integer().min(1)

const rollGroupSchema = (quantity: number, sides: number) => Joi.object().keys({
  sides,
  rolls: Joi.array().required().length(quantity).items(
    Joi.object().keys({
      diceRoll: rollSchema.required(),
      value: rollSchema.required(),
    }),
  ),
  total: Joi.number().required().integer().min(quantity),
})

// equation parts that aren't dice notation are returned as-is

test('returns string equation parts without any changes', async () => {
  expect(rollDiceNotationWithParts(['5'])).toEqual(['5'])
  expect(rollDiceNotationWithParts(['20'])).toEqual(['20'])
  expect(rollDiceNotationWithParts(['2', '+', '2'])).toEqual(['2', '+', '2'])
  expect(rollDiceNotationWithParts(['5', '-', '0'])).toEqual(['5', '-', '0'])
  expect(rollDiceNotationWithParts(['15', '/', '3'])).toEqual(['15', '/', '3'])
  expect(rollDiceNotationWithParts(['2', '*', '6', '-', '1'])).toEqual(['2', '*', '6', '-', '1'])
})

test('returns RollGroup equation parts for dice notation', async () => {
  expect(rollDiceNotationWithParts(['1d4'])[0]).toMatchJoiSchema(rollGroupSchema(1, 4))
  expect(rollDiceNotationWithParts(['1d6'])[0]).toMatchJoiSchema(rollGroupSchema(1, 6))
  expect(rollDiceNotationWithParts(['2d8'])[0]).toMatchJoiSchema(rollGroupSchema(2, 8))
  expect(rollDiceNotationWithParts(['3d10'])[0]).toMatchJoiSchema(rollGroupSchema(3, 10))
  expect(rollDiceNotationWithParts(['4d12'])[0]).toMatchJoiSchema(rollGroupSchema(4, 12))
  expect(rollDiceNotationWithParts(['5d20'])[0]).toMatchJoiSchema(rollGroupSchema(5, 20))
})

test('returns a mix of string and RollGroup equation parts', async () => {
  const result = rollDiceNotationWithParts(['3d8', '+', '1d6', '-', '2'])

  expect(result).toHaveLength(5)
  expect(result[0]).toMatchJoiSchema(rollGroupSchema(3, 8))
  expect(result[1]).toBe('+')
  expect(result[2]).toMatchJoiSchema(rollGroupSchema(1, 6))
  expect(result[3]).toBe('-')
  expect(result[4]).toBe('2')
})

test('returns RollGroup equation parts with a quantity of 1 when no quantity is specified', async () => {
  expect(rollDiceNotationWithParts(['d4'])[0]).toMatchJoiSchema(rollGroupSchema(1, 4))
  expect(rollDiceNotationWithParts(['d6'])[0]).toMatchJoiSchema(rollGroupSchema(1, 6))
  expect(rollDiceNotationWithParts(['d8'])[0]).toMatchJoiSchema(rollGroupSchema(1, 8))
  expect(rollDiceNotationWithParts(['d10'])[0]).toMatchJoiSchema(rollGroupSchema(1, 10))
  expect(rollDiceNotationWithParts(['d12'])[0]).toMatchJoiSchema(rollGroupSchema(1, 12))
  expect(rollDiceNotationWithParts(['d20'])[0]).toMatchJoiSchema(rollGroupSchema(1, 20))
})

test('returns d20 RollGroup equation parts with modifiers when one is specified', async () => {
  const modifiedRollGroupSchema = (
    quantity: number,
    modifier: RollModifier,
  ) => Joi.object().keys({
    modifier,
    sides: Joi.number().required().valid(20),
    rolls: Joi.array().required().length(quantity).items(
      Joi.object().keys({
        diceRoll: rollSchema.required(),
        secondRoll: rollSchema.required(),
        value: rollSchema.required(),
      }),
    ),
    total: Joi.number().required().integer().min(quantity),
  })

  const advantageResult = rollDiceNotation(['1d20'], 'advantage', D100_METHOD_DEFAULT)
  expect(advantageResult[0]).toMatchJoiSchema(modifiedRollGroupSchema(1, 'advantage'))

  const disadvantageResult = rollDiceNotation(['2d20'], 'disadvantage', D100_METHOD_DEFAULT)
  expect(disadvantageResult[0]).toMatchJoiSchema(modifiedRollGroupSchema(2, 'disadvantage'))
})

test('returns RollGroup equation parts for the specified D100Method', async () => {
  const percentileRollGroupSchema = (quantity: number) => Joi.object().keys({
    sides: Joi.number().required().valid(100),
    rolls: Joi.array().required().length(quantity).items(
      Joi.object().keys({
        diceRoll: rollSchema.required(),
        tensRoll: rollSchema.required(),
        value: rollSchema.required(),
      }),
    ),
    total: Joi.number().required().integer().min(quantity),
  })

  const d100Result = rollDiceNotation(['1d100'], null, 'd100')
  expect(d100Result[0]).toMatchJoiSchema(rollGroupSchema(1, 100))

  const consistentResult = rollDiceNotation(['2d100'], null, 'consistent')
  expect(consistentResult[0]).toMatchJoiSchema(percentileRollGroupSchema(2))

  const exceptionResult = rollDiceNotation(['3d100'], null, 'exception')
  expect(exceptionResult[0]).toMatchJoiSchema(percentileRollGroupSchema(3))
})

test('throws a DiceNotationError when the equation is empty', async () => {
  expect(() => rollDiceNotationWithParts([''])).toThrowError(
    new DiceNotationError(['Nothing to roll! Run dnd-roll --help for examples.']),
  )
})

test('throws a DiceNotationError when a dice notation has a quantity of zero', async () => {
  expect(() => rollDiceNotationWithParts(['0d6'])).toThrowError(
    new DiceNotationError(['Cannot roll a dice zero times: "0d6".']),
  )

  expect(() => rollDiceNotationWithParts(['0d20'])).toThrowError(
    new DiceNotationError(['Cannot roll a dice zero times: "0d20".']),
  )
})

test('throws a DiceNotationError when a dice notation has an invalid number of sides', async () => {
  expect(() => rollDiceNotationWithParts(['d3'])).toThrowError(
    new DiceNotationError([`Dice must have ${POLYHEDRAL_SIDES.join('/')} sides: "d3".`]),
  )

  expect(() => rollDiceNotationWithParts(['2d7'])).toThrowError(
    new DiceNotationError([`Dice must have ${POLYHEDRAL_SIDES.join('/')} sides: "2d7".`]),
  )
})

test('throws a DiceNotationError when there are multiple problems with dice notation', async () => {
  expect.assertions(2)

  try {
    rollDiceNotationWithParts(['0d3'])
  } catch (error) {
    expect(error.errors).toEqual([
      'Cannot roll a dice zero times: "0d3".',
      `Dice must have ${POLYHEDRAL_SIDES.join('/')} sides: "0d3".`,
    ])
  }

  try {
    rollDiceNotationWithParts(['d7', '+', '0d12'])
  } catch (error) {
    expect(error.errors).toEqual([
      `Dice must have ${POLYHEDRAL_SIDES.join('/')} sides: "d7".`,
      'Cannot roll a dice zero times: "0d12".',
    ])
  }
})
