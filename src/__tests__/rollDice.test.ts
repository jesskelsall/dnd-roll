import Joi from 'joi'
import { rollDice } from '../roll'

const rollsSidesSchema = (sides: number) => Joi.object().keys({
  rolls: Joi.array().required().min(1).items(
    Joi.number().integer().min(1),
  ),
  sides,
  sum: Joi.number().required().integer().min(1),
})

test('returns a Rolls object', async () => {
  const result = rollDice(6, 2)

  expect(result).toMatchJoiSchema(
    Joi.object().keys({
      rolls: Joi.array().required().length(2).items(
        Joi.number().integer().min(1).max(6),
      ),
      sides: Joi.number().required().valid(6),
      sum: Joi.number().required().integer().min(2),
    }),
  )
})

test('returns a Roll for each quantity of rolls', async () => {
  const rollsCountSchema = (quantity: number) => Joi.object().keys({
    rolls: Joi.array().required().length(quantity),
  }).unknown()

  expect(rollDice(4, 1)).toMatchJoiSchema(rollsCountSchema(1))
  expect(rollDice(6, 2)).toMatchJoiSchema(rollsCountSchema(2))
  expect(rollDice(8, 5)).toMatchJoiSchema(rollsCountSchema(5))
  expect(rollDice(10, 10)).toMatchJoiSchema(rollsCountSchema(10))
  expect(rollDice(12, 21)).toMatchJoiSchema(rollsCountSchema(21))
})

test('returns d4 rolls', async () => {
  expect(rollDice(4, 2)).toMatchJoiSchema(rollsSidesSchema(4))
})

test('returns d6 rolls', async () => {
  expect(rollDice(6, 2)).toMatchJoiSchema(rollsSidesSchema(6))
})

test('returns d8 rolls', async () => {
  expect(rollDice(8, 2)).toMatchJoiSchema(rollsSidesSchema(8))
})

test('returns d10 rolls', async () => {
  expect(rollDice(10, 2)).toMatchJoiSchema(rollsSidesSchema(10))
})

test('returns d12 rolls', async () => {
  expect(rollDice(12, 2)).toMatchJoiSchema(rollsSidesSchema(12))
})

test('returns d20 rolls', async () => {
  expect(rollDice(20, 2)).toMatchJoiSchema(rollsSidesSchema(20))
})

test('throws when rolling with an invalid number of sides', async () => {
  expect(() => rollDice(3, 1)).toThrow('Invalid dice: d3')
  expect(() => rollDice(19, 1)).toThrow('Invalid dice: d19')
})

test('throws when rolling 0 times', async () => {
  expect(() => rollDice(6, 0)).toThrow('Invalid number of d6: 0')
  expect(() => rollDice(20, 0)).toThrow('Invalid number of d20: 0')
})
