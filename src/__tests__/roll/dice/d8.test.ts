import Joi from 'joi'
import { AVERAGE_TOLERANCE } from '../../../consts'
import { dice } from '../../../roll/dice'
import { DiceRoll } from '../../../roll/types'
import { repeat } from '../../_helpers/repeat'

const SIDES = 8
const d8 = dice(SIDES)

test('returns a number', async () => {
  expect.assertions(SIDES)

  repeat(SIDES, () => {
    expect(d8()).toMatchJoiSchema(Joi.number().integer())
  })
})

test('returns a number between 1 and 8', async () => {
  const rolls = repeat<DiceRoll>(SIDES * 100, d8)

  expect(Math.min(...rolls)).toBeGreaterThanOrEqual(1)
  expect(Math.max(...rolls)).toBeLessThanOrEqual(8)
})

test('returns an average of 4.5 within an acceptable tolerance', async () => {
  const times = SIDES * 500000
  const rolls = repeat<DiceRoll>(times, d8)

  const pureAverage = 4.5
  const realAverage = rolls.reduce((sum, roll) => sum + roll) / times
  const deviation = Math.abs(pureAverage - realAverage)

  expect(deviation).toBeLessThanOrEqual(AVERAGE_TOLERANCE)
})
