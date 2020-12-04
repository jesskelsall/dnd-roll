import { D100Method, RollModifier } from '../roll/types'
import { displayResult } from './display'
import { displayDiceNotationErrors, displayError } from './errors'
import { DiceNotationError } from './errors/DiceNotationError'
import { InvalidEquationError } from './errors/InvalidEquationError'
import { formatEquation } from './format'
import { calculateResult } from './result'
import { rollDiceNotation } from './roll'

export const runEquation = (
  equation: string,
  modifier: RollModifier | null,
  d100Method: D100Method,
): void => {
  const formattedEquation = formatEquation(equation)

  try {
    const equationParts = rollDiceNotation(
      formattedEquation.split(' '),
      modifier,
      d100Method,
    )

    const result = calculateResult(equationParts)

    displayResult(equationParts, result)
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
