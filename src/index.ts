import { interpretArguments } from './options/yargs'

interpretArguments(process.argv)

// TODO

// [x] join argv together with spaces
// [x] replace "X dX" with "XdX"
// [ ] split back into an array

// [ ] Any part that matches "XdX" is replaced with a rolls object
// [ ] So the array is made up of strings OR rolls

// [ ] RESULT
// [ ] map the array, resolving the objects to their total property
// [ ] make sure casting to string is working properly
// [ ] reassemble string and run string-math on it

// [ ] DISPLAY - TOTAL
// [ ] map the array, resolving the objects to their total property
// [ ] apply colour styling based on the type of dice

// [ ] DISPLAY - EACH ROLL
// [ ] map the array, resolving the objects to a string of individual rolls
// [ ] format should look like "(X + Y + Z)"
// [ ] each number is coloured based on the type of dice

// [ ] OPTION - HIGHLIGHT NATURALS
// [ ] when rolling a d20, use different styling for 1 and 20 rolls
// [ ] background colour should be red or green with black text

// [ ] OPTION - COLOUR SCALING
// [ ] each dice roll is on a red -> green spectrum based on maximum value
// [ ] use chalk.hsl and a hue range to build a spectrum programmatically

// [ ] PERCENTILE SUPPORT
// [ ] Allow d100 or "percentile" to be used
// [ ] aside from 1-100 number, the value on each dice with zeroes will need capturing
// [ ] this will mean storing d100 rolls differently

// [ ] COMMAND - percentile
// [ ] literally just runs "percentile"

// [ ] COMMAND - skill n
// [ ] rolls a d20 + n
// [ ] support "skill - 5" or "skill + 5" as well as "skill -5"
// [ ] always show "d20 - 5" instead of "d20 + -5"

// [ ] OPTION - skill advantage/disadvantage
// [ ] rolls the dice with advantage or disadvantage
// [ ] integrate this behaviour into rollDice - each dice is rolled twice
// [ ] will need to be able to display both dice rolls like the d100 does
// [ ] find a way to visually indicate which dice was chosen
