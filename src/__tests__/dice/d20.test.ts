import Joi from 'joi'
import { AVERAGE_TOLERANCE } from '../../consts'
import { dice } from '../../dice'
import { Roll } from '../../types'
import { repeat } from '../_helpers/repeat'

const SIDES = 20
const d20 = dice(SIDES)

test('returns a number', async () => {
  expect.assertions(SIDES)

  repeat(SIDES, () => {
    expect(d20()).toMatchJoiSchema(Joi.number().integer())
  })
})

test('returns a number between 1 and 20', async () => {
  const rolls = repeat<Roll>(SIDES * 100, d20)

  expect(Math.min(...rolls)).toBeGreaterThanOrEqual(1)
  expect(Math.max(...rolls)).toBeLessThanOrEqual(20)
})

test('returns an average of 10.5 within an acceptable tolerance', async () => {
  const times = SIDES * 500000
  const rolls = repeat<Roll>(times, d20)

  const pureAverage = 10.5
  const realAverage = rolls.reduce((sum, roll) => sum + roll) / times
  const deviation = Math.abs(pureAverage - realAverage)

  expect(deviation).toBeLessThanOrEqual(AVERAGE_TOLERANCE)
})
