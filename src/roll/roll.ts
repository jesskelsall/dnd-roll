import { die } from './die'
import percentileMethods from './percentileValue'
import {
  DoubleRoll,
  PercentileMethod,
  PercentileRoll,
  PolyhedralSides,
  RollModifier,
  SingleRoll,
} from './types'

// Rolls a single polyhedral die once
export const rollDie = (sides: PolyhedralSides): SingleRoll => {
  const diceRoll = die(sides)()

  return {
    diceRoll,
    value: diceRoll,
  }
}

// Rolls a single d20 twice for advantage or disadvantage
// Advantage: highest number
// Disadvantage: lowest number
export const rollDoubleDice = (
  rollModifier: RollModifier,
): DoubleRoll => {
  const d20 = die(20)
  const firstRoll = d20()
  const secondRoll = d20()

  const valueFunction = rollModifier === 'advantage' ? Math.max : Math.min

  return {
    diceRoll: firstRoll,
    secondRoll,
    value: valueFunction(firstRoll, secondRoll),
  }
}

// Rolls a d10 twice to create a 1-100 number
// Use one of the two methods of turning two 1-10 numbers into a 1-100 number
export const rollPercentileDice = (
  percentileMethod: PercentileMethod,
): PercentileRoll => {
  const d10 = die(10)
  const tensRoll = d10()
  const unitsRoll = d10()

  const valueFunction = percentileMethod === 'consistent'
    ? percentileMethods.consistent
    : percentileMethods.exception

  return {
    diceRoll: unitsRoll,
    tensRoll,
    value: valueFunction(tensRoll, unitsRoll),
  }
}
