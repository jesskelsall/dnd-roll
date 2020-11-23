import { die } from './die'
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

// Always treat "00" as 0
// Always treat "0" as 10
// e.g. "90" + "0" = 100, "00" + "0" = 10
export const getConsistentPercentileValue = (
  tensRoll: number,
  unitsRoll: number,
): number => (tensRoll - 1) * 10 + unitsRoll

// Typically treat "00" as 0
// Always treat "0" as 10
// "00" means 100 if coupled with "0" (exception)
// e.g. "90" + "0" = 90, "00" + "0" = 100
export const getExceptionPercentileValue = (
  tensRoll: number,
  unitsRoll: number,
): number => {
  if (tensRoll === 10 && unitsRoll === 10) return 100
  return (tensRoll - 1) * 10 + (unitsRoll - 1)
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
    ? getConsistentPercentileValue
    : getExceptionPercentileValue

  return {
    diceRoll: unitsRoll,
    tensRoll,
    value: valueFunction(tensRoll, unitsRoll),
  }
}
