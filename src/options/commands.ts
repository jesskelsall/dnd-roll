import { SKILL_BONUS_DEFAULT } from '../consts'
import equation from '../equation'
import { EquationOptions } from '../equation/types'
import { parseArgv } from './parse'
import { Options, Yargs } from './types'

export const optionsToEquationOptions = (options: Options): EquationOptions => ({
  d100Method: options.d100Method,
  modifier: options.modifier,
  verbose: options.verbose,
})

// Default command - runs whatever dice notation equation the user enters
export const equationCommand = (args: Yargs): void => {
  const parsedArguments = parseArgv(args, false)

  equation.run(
    parsedArguments.equation,
    optionsToEquationOptions(parsedArguments),
  )
}

// Percentile command - rolls a d100
export const percentileCommand = (args: Yargs): void => {
  const parsedArguments = parseArgv(args, true)

  equation.run(
    'd100',
    optionsToEquationOptions(parsedArguments),
  )
}

// Skill command - rolls a d20 and applies the skill modifier
export const skillCommand = (args: Yargs): void => {
  const parsedArguments = parseArgv(args, true)

  const bonus = parsedArguments.bonus || SKILL_BONUS_DEFAULT
  const isNegative = bonus < 0
  const operator = isNegative ? '-' : '+'

  equation.run(
    `d20 ${operator} ${Math.abs(bonus)}`,
    optionsToEquationOptions(parsedArguments),
  )
}

export default {
  equation: equationCommand,
  percentile: percentileCommand,
  skill: skillCommand,
}
