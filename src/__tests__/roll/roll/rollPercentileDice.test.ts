import Joi from 'joi'
import percentileMethods from '../../../roll/percentileValue'
import { rollPercentileDice } from '../../../roll/roll'

const rollSchema = Joi.number().integer().min(1).max(10)
const valueSchema = Joi.number().integer().min(1).max(100)

test('returns a function', async () => {
  const functionSchema = Joi.function().arity(0)

  expect(rollPercentileDice('consistent')).toMatchJoiSchema(functionSchema)
  expect(rollPercentileDice('exception')).toMatchJoiSchema(functionSchema)
})

test('returns a function that returns a PercentileRoll', async () => {
  const percentileRollSchema = Joi.object().keys({
    diceRoll: rollSchema.required(),
    tensRoll: rollSchema.required(),
    value: valueSchema.required(),
  })

  expect(rollPercentileDice('consistent')()).toMatchJoiSchema(percentileRollSchema)
  expect(rollPercentileDice('exception')()).toMatchJoiSchema(percentileRollSchema)
})

test('calls getConsistentPercentileValue with a percentileMethod of "consistent"', async () => {
  const spy = jest.spyOn(percentileMethods, 'consistent')

  rollPercentileDice('consistent')()
  expect(spy).toHaveBeenCalledTimes(1)
})

test('calls getExceptionPercentileValue with a percentileMethod of "exception"', async () => {
  const spy = jest.spyOn(percentileMethods, 'exception')

  rollPercentileDice('exception')()
  expect(spy).toHaveBeenCalledTimes(1)
})
