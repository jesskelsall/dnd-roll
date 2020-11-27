import { D100Method, RollModifier } from '../roll/types'

// Node.js process.argv array
export type Argv = string[]

// yargs object returned after parsing argv
export interface Yargs {
  _: Array<string | number>,
  advantage?: boolean,
  bonus?: number,
  disadvantage?: boolean,
  percentile: string,
}

// Arguments formatted into simple properties
// Non-specific arguments joined into equation string
export interface Options {
  bonus?: number,
  d100Method: D100Method,
  equation: string,
  modifier: RollModifier | null,
}
