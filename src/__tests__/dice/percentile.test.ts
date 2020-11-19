import Joi from 'joi'
import { AVERAGE_TOLERANCE } from '../../consts'
import { percentile } from '../../dice'
import { Roll } from '../../types'
import { repeat } from '../_helpers/repeat'

const SIDES = 100

test('returns a number', async () => {
  expect.assertions(SIDES)

  repeat(SIDES, () => {
    expect(percentile()).toMatchJoiSchema(Joi.number().integer())
  })
})

test('returns a number between 1 and 100', async () => {
  const rolls = repeat<Roll>(SIDES * 100, percentile)

  expect(Math.min(...rolls)).toBeGreaterThanOrEqual(1)
  expect(Math.max(...rolls)).toBeLessThanOrEqual(100)
})

test('returns an average of 50.5 within an acceptable tolerance', async () => {
  const times = SIDES * 500000
  const rolls = repeat<Roll>(times, percentile)

  const pureAverage = 50.5
  const realAverage = rolls.reduce((sum, roll) => sum + roll) / times
  const deviation = Math.abs(pureAverage - realAverage)

  expect(deviation).toBeLessThanOrEqual(AVERAGE_TOLERANCE)
})
