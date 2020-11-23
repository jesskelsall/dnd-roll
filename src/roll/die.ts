import { Die, PolyhedralSides } from './types'

// Return a function that acts as a polyhedral die
// It returns a random number from 1 to sides with equal chance
export const die = (sides: PolyhedralSides): Die => () => Math.floor(Math.random() * sides) + 1
