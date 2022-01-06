import { DICE_COLOURS } from '../consts/consts_colours'
import { RollGroup, SingleRollGroup } from '../roll/types'
import { EquationParts } from './types'

export const encapsulateInBrackets = (
  openingBracket: string,
  closingBracket: string,
  separator: string,
) => (strings: string[]): string => [
  openingBracket,
  strings.join(separator),
  closingBracket,
].join('')

export const encapsulateRolls = encapsulateInBrackets('(', ')', ' + ')
export const encapsulateModifier = encapsulateInBrackets('[', ']', ', ')
export const encapsulatePercentile = encapsulateInBrackets('{', '}', ' & ')

// Displays dice roll notation in a colour unique to each polyhedral dice
export const displayRollGroup = (
  rollGroup: RollGroup,
  verbose: number,
): string => {
  const diceColour = DICE_COLOURS[rollGroup.sides]

  if (verbose >= 1) {
    return encapsulateRolls(
      (rollGroup as SingleRollGroup).rolls.map((roll) => diceColour(roll.value)),
    )
  }

  return diceColour(rollGroup.total)
}

// Outputs the completed equation and result to the console
// Displays each dice notation, string parts of the equation, and the result
// Looks like a mathematical equality statement
export const displayResult = (
  equationParts: EquationParts,
  result: number,
  verbose: number,
): void => {
  const equation = equationParts
    .map((part) => {
      if (typeof part === 'object') return displayRollGroup(part, verbose)
      return part
    })
    .join(' ')

  console.info(`${equation} = ${result}`)
}
