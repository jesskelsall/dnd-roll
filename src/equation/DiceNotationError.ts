// A custom error class for issues found with the provided dice notation
// Allows multiple error causes to be provided so they can all be displayed at once
export class DiceNotationError extends Error {
  errors: string[]

  constructor(errors: string[]) {
    /* istanbul ignore next */
    super(errors[0])

    // Workaround to get instanceof working correctly in TypeScript
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, DiceNotationError.prototype)

    this.errors = errors
  }
}
