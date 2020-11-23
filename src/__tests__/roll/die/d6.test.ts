import Joi from 'joi'
import { AVERAGE_TOLERANCE } from '../../../consts'
import { die } from '../../../roll/die'
import { repeat } from '../../_helpers/repeat'

const SIDES = 6
const d6 = die(SIDES)

test('returns a number', async () => {
  expect.assertions(SIDES)

  repeat(SIDES, () => {
    expect(d6()).toMatchJoiSchema(Joi.number().integer())
  })
})

test('returns a number between 1 and 6', async () => {
  const rolls = repeat<number>(SIDES * 100, d6)

  expect(Math.min(...rolls)).toBeGreaterThanOrEqual(1)
  expect(Math.max(...rolls)).toBeLessThanOrEqual(6)
})

test('returns an average of 3.5 within an acceptable tolerance', async () => {
  const times = SIDES * 500000
  const rolls = repeat<number>(times, d6)

  const pureAverage = 3.5
  const realAverage = rolls.reduce((sum, roll) => sum + roll) / times
  const deviation = Math.abs(pureAverage - realAverage)

  expect(deviation).toBeLessThanOrEqual(AVERAGE_TOLERANCE)
})
