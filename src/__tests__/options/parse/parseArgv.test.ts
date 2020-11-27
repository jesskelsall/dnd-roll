import Joi from 'joi'
import { D100_METHODS } from '../../../consts'
import { parseArgv } from '../../../options/parse'
import { equationYargs, percentileYargs, skillYargs } from '../../_stubs/yargs'

const equationSchema = (equation: string) => Joi.object().keys({
  equation,
}).unknown()

test('returns Options', async () => {
  const optionsSchema = Joi.object().keys({
    bonus: Joi.number().optional().integer(),
    d100Method: Joi.string().required().valid(...D100_METHODS),
    equation: Joi.string().required().allow(''),
    modifier: Joi.alternatives(
      Joi.string().valid('advantage', 'disadvantage'),
      null,
    ).required(),
  })

  equationYargs.forEach((yargs) => {
    expect(parseArgv(yargs, false)).toMatchJoiSchema(optionsSchema)
  })

  const commandYargs = [...skillYargs, ...percentileYargs]
  commandYargs.forEach((yargs) => {
    expect(parseArgv(yargs, true)).toMatchJoiSchema(optionsSchema)
  })
})

test('returns an equation property from all remaining arguments', async () => {
  expect.assertions(equationYargs.length + 1)

  const expectedEquations = [
    'd6',
    'd20',
    'd100',
    '2d8',
    '3d10 + 1',
    '6d4 - 1',
    '3d8 + d6 + 2',
  ]

  expect(expectedEquations).toHaveLength(equationYargs.length)

  equationYargs.forEach((yargs, index) => {
    expect(parseArgv(yargs, false)).toMatchJoiSchema(equationSchema(expectedEquations[index]))
  })
})

test('returns an equation property without the command argument', async () => {
  expect.assertions(skillYargs.length + 1)

  const expectedEquations = [
    '',
    '',
    '',
    '',
    '',
    '',
  ]

  expect(expectedEquations).toHaveLength(skillYargs.length)

  skillYargs.forEach((yargs, index) => {
    expect(parseArgv(yargs, true)).toMatchJoiSchema(equationSchema(expectedEquations[index]))
  })
})

test('returns a d100 property from the percentile argument', async () => {
  expect.assertions(percentileYargs.length + 1)

  const percentileSchema = (percentile: string) => Joi.object().keys({
    percentile,
  }).unknown()

  const expectedPercentiles = [
    'exception',
    'd100',
    'constant',
    'exception',
    'exception',
  ]

  expect(expectedPercentiles).toHaveLength(percentileYargs.length)

  percentileYargs.forEach((yargs, index) => {
    expect(parseArgv(yargs, true)).toMatchJoiSchema(percentileSchema(expectedPercentiles[index]))
  })
})

test('returns a modifier property from the advantage and disadvantage arguments', async () => {
  expect.assertions(skillYargs.length + 1)

  const modifierSchema = (modifier: string | null) => Joi.object().keys({
    modifier,
  }).unknown()

  const expectedModifiers = [
    null,
    null,
    null,
    null,
    'advantage',
    'disadvantage',
  ]

  expect(expectedModifiers).toHaveLength(skillYargs.length)

  skillYargs.forEach((yargs, index) => {
    expect(parseArgv(yargs, true)).toMatchJoiSchema(modifierSchema(expectedModifiers[index]))
  })
})

test('returns a bonus property from the skill bonus argument', async () => {
  expect.assertions(skillYargs.length + 1)

  const bonusSchema = (bonus: number) => Joi.object().keys({
    bonus,
  }).unknown()

  const expectedBonuses = [
    0,
    0,
    2,
    -1,
    0,
    0,
  ]

  expect(expectedBonuses).toHaveLength(skillYargs.length)

  skillYargs.forEach((yargs, index) => {
    expect(parseArgv(yargs, true)).toMatchJoiSchema(bonusSchema(expectedBonuses[index]))
  })
})
