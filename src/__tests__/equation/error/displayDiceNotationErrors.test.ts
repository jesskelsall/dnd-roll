import stripAnsi from 'strip-ansi'
import { DiceNotationError, displayDiceNotationErrors } from '../../../equation/error'

const consoleSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn())

afterEach(() => {
  consoleSpy.mockClear()
})

const diceNotationErrors: DiceNotationError[] = [
  new DiceNotationError([
    'Cannot roll a dice zero times: "0d8".',
  ]),
  new DiceNotationError([
    'Dice must have 4/6/8/10/12/20/100 sides: "3d7".',
  ]),
  new DiceNotationError([
    'Cannot roll a dice zero times: "0d6".',
    'Dice must have 4/6/8/10/12/20/100 sides: "2d3".',
  ]),
]

test('calls console.error with the error message', async () => {
  expect.assertions(7)

  diceNotationErrors.forEach((diceNotationError) => {
    displayDiceNotationErrors(diceNotationError)

    expect(consoleSpy).toHaveBeenCalled()

    diceNotationError.errors.forEach((error, index) => {
      const errorMessage = consoleSpy.mock.calls[index][0] as string
      expect(stripAnsi(errorMessage).endsWith(error)).toBeTruthy()
    })

    consoleSpy.mockClear()
  })
})

test('calls console.error with a dice notation error prefix', async () => {
  expect.assertions(7)

  diceNotationErrors.forEach((diceNotationError) => {
    displayDiceNotationErrors(diceNotationError)

    expect(consoleSpy).toHaveBeenCalled()

    diceNotationError.errors.forEach((error, index) => {
      const errorMessage = consoleSpy.mock.calls[index][0] as string
      expect(stripAnsi(errorMessage).startsWith('Invalid dice notation')).toBeTruthy()
    })

    consoleSpy.mockClear()
  })
})

test('calls console.error for each DiceNotationError error', async () => {
  expect.assertions(diceNotationErrors.length)

  diceNotationErrors.forEach((diceNotationError) => {
    displayDiceNotationErrors(diceNotationError)

    expect(consoleSpy).toHaveBeenCalledTimes(diceNotationError.errors.length)

    consoleSpy.mockClear()
  })
})
