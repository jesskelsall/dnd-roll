import { Dice, PolyhedralSides } from './types'

// Return a function that acts as a polyhedral dice
// It returns a random number from 1 to sides with equal chance
export const dice = (sides: PolyhedralSides): Dice => () => Math.floor(Math.random() * sides) + 1
