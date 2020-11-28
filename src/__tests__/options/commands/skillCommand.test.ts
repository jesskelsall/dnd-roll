import equation from '../../../equation'
import { skillCommand } from '../../../options/commands'
import { skillOptions } from '../../_stubs/options'
import { skillYargs } from '../../_stubs/yargs'

const spy = jest.spyOn(equation, 'run').mockImplementation(jest.fn())

afterEach(() => {
  spy.mockClear()
})

test('runs runEquation with a "d20 + bonus" equation', async () => {
  expect.assertions(skillYargs.length * 2 + 1)

  const expectedEquations = [
    'd20 + 0',
    'd20 + 0',
    'd20 + 2',
    'd20 - 1',
    'd20 + 0',
    'd20 + 0',
  ]

  expect(expectedEquations).toHaveLength(skillYargs.length)

  skillYargs.forEach((yargs, index) => {
    skillCommand(yargs)

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toBe(expectedEquations[index])

    spy.mockClear()
  })
})

test('runs runEquation with an unmodified modifier', async () => {
  expect.assertions(skillYargs.length * 2 + 1)
  expect(skillOptions).toHaveLength(skillYargs.length)

  skillYargs.forEach((yargs, index) => {
    skillCommand(yargs)

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][1]).toBe(skillOptions[index].modifier)

    spy.mockClear()
  })
})

test('runs runEquation with an unmodified d100Method', async () => {
  expect.assertions(skillYargs.length * 2 + 1)
  expect(skillOptions).toHaveLength(skillYargs.length)

  skillYargs.forEach((yargs, index) => {
    skillCommand(yargs)

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][2]).toBe(skillOptions[index].d100Method)

    spy.mockClear()
  })
})
