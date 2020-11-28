import { RollGroup } from '../roll/types'

// EQUATION

// An equation string split into an array of space separated parts
// Dice notation has been rolled and turned into RollGroup objects
export type EquationParts = Array<string | RollGroup>
