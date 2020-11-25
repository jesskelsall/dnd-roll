import { POLYHEDRAL_SIDES } from '../consts'

// DICE

// A polyhedral die with a number of sides (s) with faces from 1 to s
export type Die = () => number

// A number expressing a valid amount of sides for polyhedral dice to have
export type PolyhedralSides = 4 | 6 | 8 | 10 | 12 | 20 | 100

export const isPolyhedralSides = (
  sides: number,
): sides is PolyhedralSides => POLYHEDRAL_SIDES.includes(sides)

// ROLL METHODS

// Rolls twice instead of once, taking only one number
// Advantage: highest number
// Disadvantage: lowest number
export type RollModifier = 'advantage' | 'disadvantage'

// How to make a percentile (d100) roll:
// Consistent: tens d10 "0" = 10
// Exception: tens d10 "0" = 0. "00" + "0" = 100
// d100: roll a single 100 sided dice
export type PercentileMethod = 'consistent' | 'exception'
export type D100Method = PercentileMethod | 'd100'

// ROLLS

// A die is rolled once
export interface SingleRoll {
  diceRoll: number,
  value: number,
}

// A die is rolled twice to provide advantage or disadvantage
export interface DoubleRoll extends SingleRoll {
  secondRoll: number,
}

// Two d10 are rolled to form a single 1-100 number
// One represents the tens, one represents the units
export interface PercentileRoll extends SingleRoll {
  tensRoll: number,
}

// The result of each dice notation e.g. 3d10
export interface NormalRollGroup {
  sides: PolyhedralSides,
  rolls: SingleRoll[],
  total: number,
}

// When rolling d20s with advantage or disadvantage, all rolls are two d20 rolls
export interface DoubleD20RollGroup extends NormalRollGroup {
  modifier: RollModifier,
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
): rollGroup is DoubleD20RollGroup => 'modifier' in rollGroup

export const isPercentileRollGroup = (
  rollGroup: RollGroup,
): rollGroup is PercentileRollGroup => rollGroup.rolls.length !== 0 && 'tensRoll' in rollGroup.rolls[0]
