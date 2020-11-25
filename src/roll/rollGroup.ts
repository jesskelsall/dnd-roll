import rollFunctions from './roll'
import {
  D100Method,
  PolyhedralSides,
  RollGroup,
  RollModifier,
} from './types'

// Rolls polyhedral dice with the given sides a quantity of times
// Collates the rolls into an array which contains each individual dice roll
// Advantage/disadvantage on d20 rolls can be applied (modifier)
// Method of rolling a d100/percentile can be specified (d100Method)
export const rollDiceGroup = (
  quantity: number,
  sides: PolyhedralSides,
  modifier: RollModifier | null = null,
  d100Method: D100Method = 'exception',
): RollGroup => {
  // Determine which function to use for rolling dice
  // Default to a simple single polyhedral dice roll
  let rollFunction = rollFunctions.die(sides)

  if (sides === 20 && modifier) rollFunction = rollFunctions.doubleDice(modifier)
  if (sides === 100 && d100Method !== 'd100') rollFunction = rollFunctions.percentileDice(d100Method)

  // Make the quantity of dice rolls
  const rolls = [...Array(quantity)].map(() => rollFunction())

  // Total up the dice values
  const total = rolls.reduce((sum, roll) => sum + roll.value, 0)

  // Conditionally add the modifier if this was d20 rolls with advantage/disadvantage
  const modifierProperty = sides === 20 && modifier ? { modifier } : {}

  return {
    ...modifierProperty,
    rolls,
    sides,
    total,
  }
}
