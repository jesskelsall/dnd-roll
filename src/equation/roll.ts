import { DICE_NOTATION_REGEX, POLYHEDRAL_SIDES } from '../consts'
import { rollDiceGroup } from '../roll/rollGroup'
import { D100Method, isPolyhedralSides, RollModifier } from '../roll/types'
import { DiceNotationError } from './error'
import { EquationParts } from './types'

const strictDiceNotationRegex = new RegExp(`^${DICE_NOTATION_REGEX.source}$`)

// Replaces each dice notation with a RollGroup object
// In doing so, each dice in the notation is rolled and their results collated
// If there are errors with the dice notation provided, return a DiceNotationError
export const rollDiceNotation = (
  equationParts: string[],
  modifier: RollModifier | null,
  d100Method: D100Method,
): EquationParts => {
  // Without anything to roll, show a useful error to help the user out
  if (equationParts.length === 1 && equationParts[0] === '') {
    throw new DiceNotationError([
      'Nothing to roll! Run dnd-roll --help for examples.',
    ])
  }

  // Collate all errors encountered so that they can all be included in a DiceNotationError
  const errors: string[] = []

  // Resolve dice notation and leave all other equation parts unmodified
  // If there are any errors this will be discarded in favour of returning the errors
  const rolledEquationParts: EquationParts = equationParts.map((equationPart) => {
    const diceNotationParts = equationPart.match(strictDiceNotationRegex)

    // If dice notation is not found, make no changes to this equation part
    if (!diceNotationParts) return equationPart

    // If there is no quantity given, roll once
    const quantity = diceNotationParts[1] ? parseInt(diceNotationParts[1], 10) : 1

    // Cannot roll zero of a dice
    if (quantity === 0) {
      errors.push(`Cannot roll a dice zero times: "${equationPart}".`)
    }

    const sides = parseInt(diceNotationParts[2], 10)

    // Sides must match the standard D&D polyhedral dice sides available
    if (!isPolyhedralSides(sides)) {
      errors.push(
        `Dice must have ${POLYHEDRAL_SIDES.join('/')} sides: "${equationPart}".`,
      )
    }

    // If any errors have already been found, there is no reason to roll any dice
    if (!isPolyhedralSides(sides) || errors.length) return equationPart

    // Roll the dice in the dice notation
    return rollDiceGroup(
      quantity,
      sides,
      modifier,
      d100Method,
    )
  })

  // If there were any errors with dice notation in this equation, throw them all
  if (errors.length) throw new DiceNotationError(errors)

  return rolledEquationParts
}
