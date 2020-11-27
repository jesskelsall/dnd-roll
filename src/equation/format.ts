import { DICE_NOTATION_REGEX } from '../consts'

const globalDiceNotationRegex = new RegExp(DICE_NOTATION_REGEX.source, 'g')

// Ensures that the equation is correctly space separated so that it can be split properly
export const formatEquation = (equation: string): string => equation
  // Standardise percentile notation
  .replace(/(percentile|d%)/gi, 'd100')
  // Collapse XdY dice notation if there are spaces e.g. "3 d 10" = "3d10"
  .replace(globalDiceNotationRegex, '$1d$2')
  // Remove all spaces
  .replace(/\s+/g, '')
  // No negative numbers allowed
  .replace(/\+-/g, '-')
  .replace(/--/g, '+')
  // Apply spacing around each operator
  .replace(/([+\-*/])/g, ' $1 ')
  .trim()
