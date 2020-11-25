import Joi from 'joi'
import { rollDoubleDice } from '../../../roll/roll'

test('returns a DoubleRoll', async () => {
  const doubleRollSchema = Joi.object().keys({
    diceRoll: Joi.number().required().integer().min(1),
    secondRoll: Joi.number().required().integer().min(1),
    value: Joi.number().required().integer().min(1),
  })

  expect(rollDoubleDice('advantage')).toMatchJoiSchema(doubleRollSchema)
  expect(rollDoubleDice('disadvantage')).toMatchJoiSchema(doubleRollSchema)
})

test('returns a value matching the highest roll with the advantage modifier', async () => {
  const result = rollDoubleDice('advantage')
  const highestRoll = result.diceRoll >= result.secondRoll ? result.diceRoll : result.secondRoll
  expect(result.value).toBe(highestRoll)
})

test('returns a value matching the lowest roll with the disadvantage modifier', async () => {
  const result = rollDoubleDice('disadvantage')
  const lowestRoll = result.diceRoll <= result.secondRoll ? result.diceRoll : result.secondRoll
  expect(result.value).toBe(lowestRoll)
})
