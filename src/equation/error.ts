import { red } from 'chalk'
import { DiceNotationError } from './DiceNotationError'

// Display an error message in a user friendly way
export const displayError = (
  prefix: string,
  message: string,
): void => {
  const redPrefix = red(`${prefix}:`)
  console.error(`${redPrefix} ${message}`)
}

// Outputs each dice notation error on its own line
export const displayDiceNotationErrors = (
  diceNotationError: DiceNotationError,
): void => {
  diceNotationError.errors.forEach((error) => {
    displayError('Invalid dice notation', error)
  })
}
