import { SKILL_BONUS_DEFAULT } from '../consts'
import equation from '../equation'
import { parseArgv } from './parse'
import { Yargs } from './types'

// Default command - runs whatever dice notation equation the user enters
export const equationCommand = (args: Yargs): void => {
  const parsedArguments = parseArgv(args, false)

  equation.run(
    parsedArguments.equation,
    parsedArguments.modifier,
    parsedArguments.d100Method,
  )
}

// Percentile command - rolls a d100
export const percentileCommand = (args: Yargs): void => {
  const parsedArguments = parseArgv(args, true)

  equation.run(
    'd100',
    parsedArguments.modifier,
    parsedArguments.d100Method,
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
    parsedArguments.modifier,
    parsedArguments.d100Method,
  )
}

export default {
  equation: equationCommand,
  percentile: percentileCommand,
  skill: skillCommand,
}
