import { Dice, PolyhedralSides, Roll } from './types'

// Return a function that acts as a polyhedral dice
// It returns a random number from 1 to sides with equal chance
export const dice = (sides: PolyhedralSides): Dice => () => Math.floor(Math.random() * sides) + 1

// A percentile dice is actually 2d10
// One acts as the tens, one as the digits
export const percentile = (): Roll => {
  const d10 = dice(10)

  // There is no 10 on a d10, only a "0" or "00"
  // Subtracting 1 from the result makes the range 0-9
  const percentileDice = (): Roll => d10() - 1

  const tensRoll = percentileDice()
  const unitsRoll = percentileDice()

  // "00" + "0" means 100, not 0
  if (tensRoll === 0 && unitsRoll === 0) return 100

  return tensRoll * 10 + unitsRoll
}
