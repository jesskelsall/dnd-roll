import Joi from 'joi'
import { AVERAGE_TOLERANCE } from '../../../consts'
import { die } from '../../../roll/die'
import { DieRoll } from '../../../roll/types'
import { repeat } from '../../_helpers/repeat'

const SIDES = 12
const d12 = die(SIDES)

test('returns a number', async () => {
  expect.assertions(SIDES)

  repeat(SIDES, () => {
    expect(d12()).toMatchJoiSchema(Joi.number().integer())
  })
})

test('returns a number between 1 and 12', async () => {
  const rolls = repeat<DieRoll>(SIDES * 100, d12)

  expect(Math.min(...rolls)).toBeGreaterThanOrEqual(1)
  expect(Math.max(...rolls)).toBeLessThanOrEqual(12)
})

test('returns an average of 6.5 within an acceptable tolerance', async () => {
  const times = SIDES * 500000
  const rolls = repeat<DieRoll>(times, d12)

  const pureAverage = 6.5
  const realAverage = rolls.reduce((sum, roll) => sum + roll) / times
  const deviation = Math.abs(pureAverage - realAverage)

  expect(deviation).toBeLessThanOrEqual(AVERAGE_TOLERANCE)
})
