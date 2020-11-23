import { POLYHEDRAL_SIDES } from '../consts'

// DICE

// The number that is returned when rolling a dice
export type DiceRoll = number

// A polyhedral dice with a number of sides (s) with faces from 1 to s
export type Dice = () => DiceRoll

// A number expressing a valid amount of sides for a polyhedral dice to have
export type PolyhedralSides = 4 | 6 | 8 | 10 | 12 | 20 | 100

export const isPolyhedralSides = (
  sides: number,
): sides is PolyhedralSides => POLYHEDRAL_SIDES.includes(sides)

// ROLLS

// A single polyhedral dice is rolled once
export interface Roll {
  diceRoll: DiceRoll,
}

// A dice is rolled twice to provide advantage or disadvantage
export interface DoubleRoll extends Roll {
  secondRoll: DiceRoll,
}

// Two d10 are rolled to form a single 1-100 number
// One represents the tens, one represents the units
export interface PercentileRoll extends Roll {
  tensRoll: DiceRoll,
}

// The result of each dice notation e.g. 3d10
export interface NormalRollGroup {
  sides: PolyhedralSides,
  rolls: Roll[],
  quantity: number,
}

// When rolling d20s with advantage or disadvantage, all rolls are two d20 rolls
// Advantage: highest number
// Disadvantage: lowest number
export interface DoubleD20RollGroup extends NormalRollGroup {
  condition: 'advantage' | 'disadvantage',
  sides: 20,
  rolls: DoubleRoll[],
}

// When rolling percentile dice, each roll is two d10 dice
export interface PercentileRollGroup extends NormalRollGroup {
  sides: 100,
  rolls: PercentileRoll[],
}

// Each dice notation could produce one of these roll groups
export type RollGroup = NormalRollGroup | DoubleD20RollGroup | PercentileRollGroup

// ROLL TYPE GUARDS

export const isDoubleRollGroup = (
  rollGroup: RollGroup,
): rollGroup is DoubleD20RollGroup => 'condition' in rollGroup

export const isPercentileRollGroup = (
  rollGroup: RollGroup,
): rollGroup is PercentileRollGroup => rollGroup.rolls.length !== 0 && 'tensRoll' in rollGroup.rolls[0]
