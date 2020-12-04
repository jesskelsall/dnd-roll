import { D100_METHODS, POLYHEDRAL_SIDES } from './consts_types'

export { D100_METHODS, POLYHEDRAL_SIDES }

export const AVERAGE_TOLERANCE = 0.006

export const D100_METHOD_DEFAULT = 'exception'

// The notation for rolling one or more dice of the same type, used by D&D
// e.g. d6, 2d8
export const DICE_NOTATION_REGEX = /(\d*)\s*d\s*(\d+)/

export const EQUATION_DELIMITER = ' '

export const SKILL_BONUS_DEFAULT = 0
