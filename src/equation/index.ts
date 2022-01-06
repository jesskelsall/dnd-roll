import { displayResult } from './display'
import { displayDiceNotationErrors, displayError } from './errors'
import { DiceNotationError } from './errors/DiceNotationError'
import { InvalidEquationError } from './errors/InvalidEquationError'
import { formatEquation } from './format'
import { calculateResult } from './result'
import { rollDiceNotation } from './roll'
import { EquationOptions } from './types'

export const runEquation = (
  equation: string,
  equationOptions: EquationOptions,
): void => {
  const formattedEquation = formatEquation(equation)

  try {
    const equationParts = rollDiceNotation(
      formattedEquation.split(' '),
      equationOptions.modifier,
      equationOptions.d100Method,
    )

    const result = calculateResult(equationParts)

    displayResult(
      equationParts,
      result,
      equationOptions.verbose,
    )
  } catch (error) {
    if (error instanceof DiceNotationError) {
      displayDiceNotationErrors(error)
    } else if (error instanceof InvalidEquationError) {
      displayError('Equation Error', error.message)
    } else {
      displayError('Application Error', error.message)
    }
  }
}

export default {
  run: runEquation,
}
