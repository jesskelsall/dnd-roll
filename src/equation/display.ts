import { RollGroup } from '../roll/types'
import { DICE_COLOURS } from '../consts/consts_colours'
import { EquationParts } from './types'

// Displays dice roll notation in a colour unique to each polyhedral dice
export const displayRollGroup = (rollGroup: RollGroup): string => {
  const diceColour = DICE_COLOURS[rollGroup.sides]
  return diceColour(rollGroup.total)
}

// Outputs the completed equation and result to the console
// Displays each dice notation, string parts of the equation, and the result
// Looks like a mathematical equality statement
export const displayResult = (
  equationParts: EquationParts,
  result: number,
): void => {
  const equation = equationParts
    .map((part) => (typeof part === 'object' ? displayRollGroup(part) : part))
    .join(' ')

  console.info(`${equation} = ${result}`)
}
