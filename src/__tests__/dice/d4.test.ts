import Joi from 'joi'
import { AVERAGE_TOLERANCE } from '../../consts'
import { dice } from '../../dice'
import { Roll } from '../../types'
import { repeat } from '../_helpers/repeat'

const SIDES = 4
const d4 = dice(SIDES)

test('returns a number', async () => {
  expect.assertions(SIDES)

  repeat(SIDES, () => {
    expect(d4()).toMatchJoiSchema(Joi.number().integer())
  })
})

test('returns a number between 1 and 4', async () => {
  const rolls = repeat<Roll>(SIDES * 100, d4)

  expect(Math.min(...rolls)).toBeGreaterThanOrEqual(1)
  expect(Math.max(...rolls)).toBeLessThanOrEqual(4)
})

test('returns an average of 2.5 within an acceptable tolerance', async () => {
  const times = SIDES * 500000
  const rolls = repeat<Roll>(times, d4)

  const pureAverage = 2.5
  const realAverage = rolls.reduce((sum, roll) => sum + roll) / times
  const deviation = Math.abs(pureAverage - realAverage)

  expect(deviation).toBeLessThanOrEqual(AVERAGE_TOLERANCE)
})
