import { D100Method, RollModifier } from '../roll/types'
import { DiceNotationError, displayDiceNotationErrors, displayError } from './error'
import { formatEquation } from './format'
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

    console.dir({
      formattedEquation,
      equationParts,
      modifier,
      d100Method,
    })
  } catch (error) {
    if (error instanceof DiceNotationError) {
      displayDiceNotationErrors(error)
    } else {
      displayError(error.message, 'Application Error')
    }
  }
}

export default {
  run: runEquation,
}

// TODO
// 1. equation string -> equation string | rollGroup
// 2. substitute rollGroups for their total and calculate the final total
// 3. display the roll as a coloured number
// 4. stitch together to make an output string including total (X + Y = Z)
// 5. nice error handling
