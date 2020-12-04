import stringMath from 'string-math'
import { InvalidEquationError } from './errors/InvalidEquationError'
import { EquationParts } from './types'

// Calculate the equation to get a numeric result
// Converts DiceGroup objects to their total first
export const calculateResult = (
  equationParts: EquationParts,
): number => {
  const equation = equationParts
    .map((part) => (typeof part === 'object' ? part.total : part))
    .join(' ')

  try {
    return stringMath(equation)
  } catch (error) {
    throw new InvalidEquationError(equation)
  }
}
