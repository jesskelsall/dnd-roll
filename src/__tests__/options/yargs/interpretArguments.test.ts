import { interpretArguments } from '../../../options/yargs'
import { equationArgvs, percentileArgvs, skillArgvs } from '../../_stubs/argv'
import { equationYargs, percentileYargs, skillYargs } from '../../_stubs/yargs'
import commands from '../../../options/commands'

// In addition to spying on each command, mock them so nothing significant runs
const equationSpy = jest.spyOn(commands, 'equation').mockImplementation(jest.fn())
const percentileSpy = jest.spyOn(commands, 'percentile').mockImplementation(jest.fn())
const skillSpy = jest.spyOn(commands, 'skill').mockImplementation(jest.fn())

// Clear spy data after each test
afterEach(() => {
  equationSpy.mockClear()
  percentileSpy.mockClear()
  skillSpy.mockClear()
})

test('runs the equation command when no command word is used', async () => {
  expect.assertions(equationArgvs.length * 2 + 1)
  expect(equationYargs).toHaveLength(equationArgvs.length)

  equationArgvs.forEach((argv, index) => {
    interpretArguments(argv)

    expect(equationSpy).toHaveBeenCalled()
    expect(equationSpy.mock.calls[0][0]).toEqual(
      expect.objectContaining(equationYargs[index]),
    )

    equationSpy.mockClear()
  })
})

test('runs the percentile command when the percentile command word is used', async () => {
  expect.assertions((percentileArgvs.length - 1) * 2 + 1)
  expect(percentileYargs).toHaveLength(percentileArgvs.length)

  // Don't test the last percentileYargs value
  // It is an intentionally invalid --percentile value and will lead to a process.exit(1)
  percentileArgvs.slice(0, -1).forEach((argv, index) => {
    interpretArguments(argv)

    expect(percentileSpy).toHaveBeenCalled()
    expect(percentileSpy.mock.calls[0][0]).toEqual(
      expect.objectContaining(percentileYargs[index]),
    )

    percentileSpy.mockClear()
  })
})

test('runs the skill command when the skill command word is used', async () => {
  expect.assertions(skillArgvs.length * 2 + 1)
  expect(skillYargs).toHaveLength(skillArgvs.length)

  skillArgvs.forEach((argv, index) => {
    interpretArguments(argv)

    expect(skillSpy).toHaveBeenCalled()
    expect(skillSpy.mock.calls[0][0]).toEqual(
      expect.objectContaining(skillYargs[index]),
    )

    skillSpy.mockClear()
  })
})
