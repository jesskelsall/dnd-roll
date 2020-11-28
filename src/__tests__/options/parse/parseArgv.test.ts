import Joi from 'joi'
import { D100_METHODS } from '../../../consts'
import { parseArgv } from '../../../options/parse'
import { equationYargs, percentileYargs, skillYargs } from '../../_stubs/yargs'
import { equationOptions, percentileOptions, skillOptions } from '../../_stubs/options'

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
  expect(equationOptions).toHaveLength(equationYargs.length)

  equationYargs.forEach((yargs, index) => {
    expect(parseArgv(yargs, false)).toMatchJoiSchema(
      equationSchema(equationOptions[index].equation),
    )
  })
})

test('returns an equation property without the command argument', async () => {
  expect.assertions(skillYargs.length + 1)
  expect(skillOptions).toHaveLength(skillYargs.length)

  skillYargs.forEach((yargs, index) => {
    expect(parseArgv(yargs, true)).toMatchJoiSchema(
      equationSchema(skillOptions[index].equation),
    )
  })
})

test('returns a d100 property from the percentile argument', async () => {
  expect.assertions(percentileYargs.length + 1)
  expect(percentileOptions).toHaveLength(percentileYargs.length)

  const percentileSchema = (percentile: string) => Joi.object().keys({
    percentile,
  }).unknown()

  percentileYargs.forEach((yargs, index) => {
    expect(parseArgv(yargs, true)).toMatchJoiSchema(
      percentileSchema(percentileOptions[index].d100Method),
    )
  })
})

test('returns a modifier property from the advantage and disadvantage arguments', async () => {
  expect.assertions(skillYargs.length + 1)
  expect(skillOptions).toHaveLength(skillYargs.length)

  const modifierSchema = (modifier: string | null) => Joi.object().keys({
    modifier,
  }).unknown()

  skillYargs.forEach((yargs, index) => {
    expect(parseArgv(yargs, true)).toMatchJoiSchema(
      modifierSchema(skillOptions[index].modifier),
    )
  })
})

test('returns a bonus property from the skill bonus argument', async () => {
  expect.assertions(skillYargs.length + 1)
  expect(skillOptions).toHaveLength(skillYargs.length)

  const bonusSchema = (bonus: number) => Joi.object().keys({
    bonus,
  }).unknown()

  skillYargs.forEach((yargs, index) => {
    expect(parseArgv(yargs, true)).toMatchJoiSchema(
      bonusSchema(skillOptions[index].bonus as number),
    )
  })
})
