import { terminalWidth } from 'yargs'
import yargs from 'yargs/yargs'
import { D100_METHODS, D100_METHOD_DEFAULT, SKILL_BONUS_DEFAULT } from '../consts'
import commands from './commands'
import { Argv } from './types'

// Runs yargs to turn the command line arguments into actionable commands and argument flags
// One of the specified commands will run
// All commands will produce an equation which is then resolved
export const interpretArguments = (argv: Argv): void => {
  // yargs needs calling to run the commands, but we don't do anything with the result
  // eslint-disable-next-line no-unused-expressions
  yargs(argv.slice(2))
    .scriptName('dnd-roll')
    .command({
      command: '$0',
      describe: 'Evaluates the given dice notation by rolling each dice and calculating the result.',
      handler: commands.equation,
    })
    .command({
      command: 'percentile',
      describe: 'Roll a d100 (percentile) dice.',
      handler: commands.percentile,
    })
    .command({
      command: 'skill [bonus]',
      describe: 'Make a skill check by rolling a d20. Optional skill bonus number.',
      builder: {
        bonus: {
          default: SKILL_BONUS_DEFAULT,
          type: 'number',
        },
      },
      handler: commands.skill,
    })
    .example('$0 d6', 'Rolls a d6.')
    .example('$0 2d8', 'Rolls two d8.')
    .example('$0 2d12 + d6 + 2', 'Rolls two d12, one d6, and adds 2.')
    .example('$0 percentile', 'Rolls a d100.')
    .example('$0 skill', 'Rolls a d20.')
    .example('$0 skill 5', 'Rolls a d20 + 5.')
    .example('$0 skill --advantage', 'Rolls two d20 and takes the highest number.')
    .options({
      advantage: {
        alias: ['a', 'adv'],
        describe: 'Roll d20s twice and take the higher number.',
        type: 'boolean',
      },
      disadvantage: {
        alias: ['d', 'disadv'],
        describe: 'Roll d20s twice and take the lower number.',
        type: 'boolean',
      },
      percentile: {
        choices: D100_METHODS,
        default: D100_METHOD_DEFAULT,
        describe: [
          'Roll percentile dice with a specific method:',
          '- As a single d100 (d100).',
          '- As 1-10 & 00-90 dice (consistent).',
          '- As 0-9 && 00-90 dice (exception).',
        ].join('\n'),
        type: 'string',
      },
    })
    .conflicts('advantage', 'disadvantage')
    .wrap(terminalWidth())
    .argv
}
