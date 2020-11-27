import { D100Method, RollModifier } from '../roll/types'

// TODO
export const runEquation = (
  equation: string,
  modifier: RollModifier | null,
  d100Method: D100Method,
): void => {
  console.dir({
    equation,
    modifier,
    d100Method,
  })
}
