import equation from '../../../equation'
import { percentileCommand } from '../../../options/commands'
import { percentileOptions } from '../../_stubs/options'
import { percentileYargs } from '../../_stubs/yargs'

const spy = jest.spyOn(equation, 'run').mockImplementation(jest.fn())

afterEach(() => {
  spy.mockClear()
})

test('runs runEquation with the "d100" equation', async () => {
  expect.assertions(percentileYargs.length * 2)

  percentileYargs.forEach((yargs) => {
    percentileCommand(yargs)

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toBe('d100')

    spy.mockClear()
  })
})

test('runs runEquation with an unmodified modifier', async () => {
  expect.assertions(percentileYargs.length * 2 + 1)
  expect(percentileOptions).toHaveLength(percentileYargs.length)

  percentileYargs.forEach((yargs, index) => {
    percentileCommand(yargs)

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][1]).toBe(percentileOptions[index].modifier)

    spy.mockClear()
  })
})

test('runs runEquation with an unmodified d100Method', async () => {
  expect.assertions(percentileYargs.length * 2 + 1)
  expect(percentileOptions).toHaveLength(percentileYargs.length)

  percentileYargs.forEach((yargs, index) => {
    percentileCommand(yargs)

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][2]).toBe(percentileOptions[index].d100Method)

    spy.mockClear()
  })
})
