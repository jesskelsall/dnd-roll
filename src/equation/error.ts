import { red } from 'chalk'

// A custom error class for issues found with the provided dice notation
// Allows multiple error causes to be provided so they can all be displayed at once
export class DiceNotationError extends Error {
  errors: string[]

  constructor(errors: string[]) {
    super(errors[0])

    // Workaround to get instanceof working correctly in TypeScript
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, DiceNotationError.prototype)

    this.errors = errors
  }
}

// Display an error message in a user friendly way
export const displayError = (
  message: string,
  prefix: string,
): void => {
  const redPrefix = red(`${prefix}:`)
  console.error(`${redPrefix} ${message}`)
}

// Outputs each dice notation error on its own line
export const displayDiceNotationErrors = (
  diceNotationError: DiceNotationError,
): void => {
  diceNotationError.errors.forEach((error) => {
    displayError(error, 'Invalid dice notation')
  })
}
