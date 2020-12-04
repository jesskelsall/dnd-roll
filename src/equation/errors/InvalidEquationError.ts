// A custom error class for issues found when running string-maths to calculate an equation
export class InvalidEquationError extends Error {
  constructor(equation: string) {
    super(`Invalid equation: "${equation}".`)

    // Workaround to get instanceof working correctly in TypeScript
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, InvalidEquationError.prototype)
  }
}
