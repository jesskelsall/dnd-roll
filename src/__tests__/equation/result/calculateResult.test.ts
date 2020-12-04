import Joi from 'joi'
import { InvalidEquationError } from '../../../equation/errors/InvalidEquationError'
import { calculateResult } from '../../../equation/result'
import { EquationParts } from '../../../equation/types'
import {
  allRollGroups, doubleRollGroups, percentileRollGroups, singleRollGroups,
} from '../../_stubs/rollGroups'

const mixedEquations: EquationParts[] = [
  [singleRollGroups[0], '+', '5'],
  [singleRollGroups[1], '+', singleRollGroups[2], '-', '1'],
  [doubleRollGroups[0], '+', '2'],
  [percentileRollGroups[0], '-', '10'],
]

test('returns a result number with string equation parts', async () => {
  expect(calculateResult(['1'])).toBe(1)
  expect(calculateResult(['1', '+', '2'])).toBe(3)
  expect(calculateResult(['3', '-', '7'])).toBe(-4)
  expect(calculateResult(['5', '*', '4'])).toBe(20)
  expect(calculateResult(['21', '/', '3'])).toBe(7)
  expect(calculateResult(['10', '/', '2', '-', '3', '+', '9', '*', '2'])).toBe(20)
})

test('returns a result number with RollGroup equation parts', async () => {
  expect.assertions(allRollGroups.length)

  allRollGroups.forEach((group) => {
    expect(calculateResult([group])).toMatchJoiSchema(
      Joi.number().integer().min(group.rolls.length).max(group.sides * group.rolls.length),
    )
  })
})

test('returns a result number with a mix of string and rollGroup equation parts', async () => {
  expect.assertions(mixedEquations.length)

  mixedEquations.forEach((equation) => {
    expect(calculateResult(equation)).toMatchJoiSchema(
      Joi.number().integer(),
    )
  })
})

test('throws an InvalidEquationError when the equation is not valid maths', async () => {
  expect(() => calculateResult(['not', 'an', 'equation'])).toThrowError(
    new InvalidEquationError('not an equation'),
  )

  expect(() => calculateResult(['5', '+', 'string'])).toThrowError(
    new InvalidEquationError('5 + string'),
  )

  expect(() => calculateResult([singleRollGroups[0], 'x', '2'])).toThrowError(
    new InvalidEquationError('4 x 2'),
  )
})
