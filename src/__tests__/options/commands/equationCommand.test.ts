import equation from '../../../equation'
import { equationCommand } from '../../../options/commands'
import { equationOptions } from '../../_stubs/options'
import { equationYargs } from '../../_stubs/yargs'

const spy = jest.spyOn(equation, 'run').mockImplementation(jest.fn())

afterEach(() => {
  spy.mockClear()
})

test('runs runEquation with an unmodified equation', async () => {
  expect.assertions(equationYargs.length * 2 + 1)
  expect(equationOptions).toHaveLength(equationYargs.length)

  equationYargs.forEach((yargs, index) => {
    equationCommand(yargs)

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toBe(equationOptions[index].equation)

    spy.mockClear()
  })
})

test('runs runEquation with an unmodified modifier', async () => {
  expect.assertions(equationYargs.length * 2 + 1)
  expect(equationOptions).toHaveLength(equationYargs.length)

  equationYargs.forEach((yargs, index) => {
    equationCommand(yargs)

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][1]).toBe(equationOptions[index].modifier)

    spy.mockClear()
  })
})

test('runs runEquation with an unmodified d100Method', async () => {
  expect.assertions(equationYargs.length * 2 + 1)
  expect(equationOptions).toHaveLength(equationYargs.length)

  equationYargs.forEach((yargs, index) => {
    equationCommand(yargs)

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][2]).toBe(equationOptions[index].d100Method)

    spy.mockClear()
  })
})
