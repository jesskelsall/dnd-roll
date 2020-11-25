import Joi from 'joi'
import percentileMethods from '../../../roll/percentileValue'
import { rollPercentileDice } from '../../../roll/roll'

const rollSchema = Joi.number().integer().min(1).max(10)
const valueSchema = Joi.number().integer().min(1).max(100)

test('returns a PercentileRoll', async () => {
  const percentileRollSchema = Joi.object().keys({
    diceRoll: rollSchema.required(),
    tensRoll: rollSchema.required(),
    value: valueSchema.required(),
  })

  const consistentResult = rollPercentileDice('consistent')
  expect(consistentResult).toMatchJoiSchema(percentileRollSchema)

  const exceptionResult = rollPercentileDice('exception')
  expect(exceptionResult).toMatchJoiSchema(percentileRollSchema)
})

test('percentileMethod of "consistent" runs getConsistentPercentileValue', async () => {
  const spy = jest.spyOn(percentileMethods, 'consistent')

  rollPercentileDice('consistent')
  expect(spy).toHaveBeenCalledTimes(1)
})

test('percentileMethod of "exception" runs getExceptionPercentileValue', async () => {
  const spy = jest.spyOn(percentileMethods, 'exception')

  rollPercentileDice('exception')
  expect(spy).toHaveBeenCalledTimes(1)
})
