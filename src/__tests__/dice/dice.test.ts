import Joi from 'joi'
import { dice } from '../../dice'
import { repeat } from '../_helpers/repeat'

test('returns a function of arity 0', async () => {
  const result = dice(6)

  expect(result).toMatchJoiSchema(Joi.function().arity(0))
})

test('returns a function that returns an integer', async () => {
  expect.assertions(10)

  const d6 = dice(6)

  repeat(10, () => {
    expect(d6()).toMatchJoiSchema(Joi.number().integer().min(1))
  })
})
