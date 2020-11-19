import { dice } from './dice'
import { isPolyhedralSides, Rolls } from './types'

// const DICE_COLOURS = {
//   4: magenta,
//   6: blue,
//   8: cyan,
//   10: green,
//   12: yellow,
//   20: red,
// }

// Rolls a quantity of the same type of polyhedral dice
// Collates all of the rolls
export const rollDice = (sides: number, quantity: number): Rolls => {
  if (!isPolyhedralSides(sides)) {
    throw new Error(`Invalid dice: d${sides}`)
  }

  if (!quantity) {
    throw new Error(`Invalid number of d${sides}: 0`)
  }

  const rolls = [...Array(quantity)].map(dice(sides))

  return {
    rolls,
    sides,
    sum: rolls.reduce((sum, roll) => sum + roll, 0),
  }
}
