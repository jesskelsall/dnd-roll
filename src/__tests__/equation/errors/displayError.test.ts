import { red } from 'ansi-styles'
import stripAnsi from 'strip-ansi'
import { displayError } from '../../../equation/errors'

const consoleSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn())

afterEach(() => {
  consoleSpy.mockClear()
})

const errors = [
  {
    prefix: 'Error',
    message: 'Message',
  },
  {
    prefix: 'Application Error',
    message: 'Something went wrong.',
  },
  {
    prefix: 'Invalid dice notation',
    message: 'Cannot roll a dice zero times: "0d8".',
  },
  {
    prefix: 'Invalid dice notation',
    message: 'Dice must have 4/6/8/10/12/20/100 sides: "3d7".',
  },
]

test('calls console.error with the error message', async () => {
  expect.assertions(errors.length * 2)

  errors.forEach((error) => {
    displayError(error.prefix, error.message)

    expect(consoleSpy).toHaveBeenCalled()

    const errorMessage = consoleSpy.mock.calls[0][0] as string
    expect(stripAnsi(errorMessage).endsWith(error.message)).toBeTruthy()

    consoleSpy.mockClear()
  })
})

test('calls console.error with the error prefix', async () => {
  expect.assertions(errors.length * 2)

  errors.forEach((error) => {
    displayError(error.prefix, error.message)

    expect(consoleSpy).toHaveBeenCalled()

    const errorMessage = consoleSpy.mock.calls[0][0] as string
    expect(stripAnsi(errorMessage).startsWith(error.prefix)).toBeTruthy()

    consoleSpy.mockClear()
  })
})

test('calls console.error with a red prefix', async () => {
  expect.assertions(errors.length * 2)

  errors.forEach((error) => {
    displayError(error.prefix, error.message)
    expect(consoleSpy).toHaveBeenCalled()

    const errorMessage = consoleSpy.mock.calls[0][0] as string
    expect(errorMessage.startsWith(`${red.open}${error.prefix}:${red.close}`)).toBeTruthy()

    consoleSpy.mockClear()
  })
})
