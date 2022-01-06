import { D100Method, RollGroup, RollModifier } from '../roll/types'

export interface EquationOptions {
  d100Method: D100Method,
  modifier: RollModifier | null,
  verbose: number,
}

// An equation string split into an array of space separated parts
// Dice notation has been rolled and turned into RollGroup objects
export type EquationParts = Array<string | RollGroup>
