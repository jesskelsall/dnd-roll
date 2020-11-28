import { D100_METHOD_DEFAULT } from '../consts'
import { isD100Method, RollModifier } from '../roll/types'
import { Options, Yargs } from './types'

// Turns the yargs return object into a more useful object
// Contains simple argument properties that can be passed into functions
// Formats the dice notation into a ready to use string
export const parseArgv = (
  yargs: Yargs,
  isCommand: boolean,
): Options => {
  // Convert separate advantage/disadvantage arguments into a single property
  let modifier: RollModifier | null = null
  if (yargs.advantage) modifier = 'advantage'
  if (yargs.disadvantage) modifier = 'disadvantage'

  // _ property contains all non-flag arguments, which is collectively the dice notation equation
  // If this is a command, remove the first _ property as it is the name of the command
  const otherArguments = yargs._.slice(isCommand ? 1 : 0)

  return {
    bonus: yargs.bonus,
    // Yargs should ensure that this valid is always a D100Method, but TypeScript doesn't know that
    d100Method: isD100Method(yargs.percentile) ? yargs.percentile : D100_METHOD_DEFAULT,
    equation: otherArguments.join(' '),
    modifier,
  }
}
