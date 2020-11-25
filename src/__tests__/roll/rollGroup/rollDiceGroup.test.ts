import Joi from 'joi'
import rollFunctions from '../../../roll/roll'
import { rollDiceGroup } from '../../../roll/rollGroup'
import {
  D100Method,
  DoubleD20RollGroup,
  isDoubleRollGroup,
  PolyhedralSides,
  RollModifier,
  SingleRoll,
} from '../../../roll/types'
import { polyhedralSides } from '../../_stubs/polyhedralSides'

const rollSchema = Joi.number().integer().min(1)

test('returns a RollGroup', async () => {
  const rollGroupSchema = Joi.object().keys({
    modifier: Joi.string().optional().valid('advantage', 'disadvantage'),
    sides: Joi.number().required().valid(...polyhedralSides),
    rolls: Joi.array().required().min(1).items(
      Joi.object().keys({
        diceRoll: rollSchema.required(),
        secondRoll: rollSchema.optional(),
        tensRoll: rollSchema.optional(),
        value: rollSchema.required(),
      }),
    ),
    total: Joi.number().required().integer().min(1),
  })

  expect(rollDiceGroup(1, 6)).toMatchJoiSchema(rollGroupSchema)
  expect(rollDiceGroup(2, 8)).toMatchJoiSchema(rollGroupSchema)
  expect(rollDiceGroup(1, 20)).toMatchJoiSchema(rollGroupSchema)
  expect(rollDiceGroup(1, 6, 'advantage')).toMatchJoiSchema(rollGroupSchema)
  expect(rollDiceGroup(1, 20, 'advantage')).toMatchJoiSchema(rollGroupSchema)
  expect(rollDiceGroup(2, 20, 'disadvantage')).toMatchJoiSchema(rollGroupSchema)
  expect(rollDiceGroup(1, 100, null, 'd100')).toMatchJoiSchema(rollGroupSchema)
  expect(rollDiceGroup(1, 100, null, 'consistent')).toMatchJoiSchema(rollGroupSchema)
  expect(rollDiceGroup(1, 100, null, 'exception')).toMatchJoiSchema(rollGroupSchema)
})

test('returns a SingleRollGroup with standard polyhedral dice rolls', async () => {
  const singleRollGroupSchema = Joi.object().keys({
    sides: Joi.number().required().valid(...polyhedralSides),
    rolls: Joi.array().required().min(1).items(
      Joi.object().keys({
        diceRoll: rollSchema.required(),
        value: rollSchema.required(),
      }),
    ),
    total: Joi.number().required().integer().min(1),
  })

  expect(rollDiceGroup(1, 6)).toMatchJoiSchema(singleRollGroupSchema)
  expect(rollDiceGroup(2, 8)).toMatchJoiSchema(singleRollGroupSchema)
  expect(rollDiceGroup(1, 20)).toMatchJoiSchema(singleRollGroupSchema)
  expect(rollDiceGroup(1, 6, 'advantage')).toMatchJoiSchema(singleRollGroupSchema)
  expect(rollDiceGroup(1, 100, null, 'd100')).toMatchJoiSchema(singleRollGroupSchema)
})

test('returns a DoubleD20RollGroup with d20 rolls with advantage/disadvantage', async () => {
  const doubleRollGroupSchema = Joi.object().keys({
    modifier: Joi.string().required().valid('advantage', 'disadvantage'),
    sides: Joi.number().required().valid(20),
    rolls: Joi.array().required().min(1).items(
      Joi.object().keys({
        diceRoll: rollSchema.required(),
        secondRoll: rollSchema.required(),
        value: rollSchema.required(),
      }),
    ),
    total: Joi.number().required().integer().min(1),
  })

  expect(rollDiceGroup(1, 20, 'advantage')).toMatchJoiSchema(doubleRollGroupSchema)
  expect(rollDiceGroup(2, 20, 'disadvantage')).toMatchJoiSchema(doubleRollGroupSchema)
})

test('returns a PercentileRollGroup with percentile rolls using two d10s', async () => {
  const percentileRollGroupSchema = Joi.object().keys({
    sides: Joi.number().required().valid(100),
    rolls: Joi.array().required().min(1).items(
      Joi.object().keys({
        diceRoll: rollSchema.required(),
        tensRoll: rollSchema.required(),
        value: rollSchema.required(),
      }),
    ),
    total: Joi.number().required().integer().min(1),
  })

  expect(rollDiceGroup(1, 100, null, 'consistent')).toMatchJoiSchema(percentileRollGroupSchema)
  expect(rollDiceGroup(1, 100, null, 'exception')).toMatchJoiSchema(percentileRollGroupSchema)
})

test('returns an object with a sides property matching the sides argument', async () => {
  expect.assertions(polyhedralSides.length)

  polyhedralSides.forEach((sides) => {
    expect(rollDiceGroup(1, sides).sides).toBe(sides)
  })
})

test('returns an object with a rolls property with a length matching the quantity argument', async () => {
  expect(rollDiceGroup(1, 6).rolls).toHaveLength(1)
  expect(rollDiceGroup(2, 8).rolls).toHaveLength(2)
  expect(rollDiceGroup(10, 12).rolls).toHaveLength(10)
  expect(rollDiceGroup(1, 20, 'advantage').rolls).toHaveLength(1)
  expect(rollDiceGroup(1, 20, 'disadvantage').rolls).toHaveLength(1)
  expect(rollDiceGroup(1, 100, null, 'd100').rolls).toHaveLength(1)
  expect(rollDiceGroup(1, 100, null, 'consistent').rolls).toHaveLength(1)
  expect(rollDiceGroup(1, 100, null, 'exception').rolls).toHaveLength(1)
})

test('returns an object with a total property matching the sum of each roll value', async () => {
  expect.assertions(8)

  const testTotalAgainstValues = (
    quantity: number,
    sides: PolyhedralSides,
    modifier: RollModifier | null = null,
    d100Method: D100Method = 'exception',
  ) => {
    const result = rollDiceGroup(quantity, sides, modifier, d100Method)

    // rolls must be coerced into SingleRoll[] to avoid type incompatabilities
    // But it's okay as we're only after the value property which is common to all roll types
    const summedRollValues = (result.rolls as SingleRoll[])
      .reduce((sum, roll) => sum + roll.value, 0)

    expect(result.total).toBe(summedRollValues)
  }

  testTotalAgainstValues(1, 6)
  testTotalAgainstValues(2, 8)
  testTotalAgainstValues(10, 12)
  testTotalAgainstValues(1, 20, 'advantage')
  testTotalAgainstValues(1, 20, 'disadvantage')
  testTotalAgainstValues(1, 100, null, 'd100')
  testTotalAgainstValues(1, 100, null, 'consistent')
  testTotalAgainstValues(1, 100, null, 'exception')
})

test('returns an object with a modifier property matching the modifier argument when it has a value and d20s are rolled', async () => {
  const d20Roll = rollDiceGroup(1, 20)
  expect(isDoubleRollGroup(d20Roll)).toBe(false)

  const d6RollWithAdvantage = rollDiceGroup(1, 6, 'advantage')
  expect(isDoubleRollGroup(d6RollWithAdvantage)).toBe(false)

  const d20RollWithAdvantage = rollDiceGroup(1, 20, 'advantage')
  expect(isDoubleRollGroup(d20RollWithAdvantage)).toBe(true)
  expect((d20RollWithAdvantage as DoubleD20RollGroup).modifier).toBe('advantage')

  const d20RollWithDisadvantage = rollDiceGroup(1, 20, 'disadvantage')
  expect(isDoubleRollGroup(d20RollWithDisadvantage)).toBe(true)
  expect((d20RollWithDisadvantage as DoubleD20RollGroup).modifier).toBe('disadvantage')
})

test('calls rollDie with standard polyhedral dice rolls', async () => {
  const spy = jest.spyOn(rollFunctions, 'die')

  rollDiceGroup(1, 6)
  rollDiceGroup(2, 8)
  rollDiceGroup(1, 20)
  rollDiceGroup(1, 6, 'advantage')
  rollDiceGroup(1, 100, null, 'd100')

  expect(spy).toHaveBeenCalledTimes(5)
})

test('calls rollDoubleDice with d20 rolls with advantage/disadvantage', async () => {
  const spy = jest.spyOn(rollFunctions, 'doubleDice')

  rollDiceGroup(1, 20, 'advantage')
  rollDiceGroup(2, 20, 'disadvantage')

  expect(spy).toHaveBeenCalledTimes(2)
})

test('calls rollPercentileDice with percentile rolls using two d10s', async () => {
  const spy = jest.spyOn(rollFunctions, 'doubleDice')

  rollDiceGroup(1, 100, null, 'consistent')
  rollDiceGroup(1, 100, null, 'exception')

  expect(spy).toHaveBeenCalledTimes(2)
})
