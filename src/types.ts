import { POLYHEDRAL_SIDES } from './consts'

// The number that is returned when rolling a dice
export type Roll = number

// A polyhedral dice with a number of sides (s) with faces from 1 to s
export type Dice = () => Roll

// A number expressing a valid amount of sides for a polyhedral dice to have
export type PolyhedralSides = 4 | 6 | 8 | 10 | 12 | 20

// Type guard
export const isPolyhedralSides = (
  sides: number,
): sides is PolyhedralSides => POLYHEDRAL_SIDES.includes(sides)

// A group of rolls on the same polyhedral dice
export interface Rolls {
  rolls: Roll[],
  sides: PolyhedralSides,
  sum: number,
}
