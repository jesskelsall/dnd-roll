import {
  blueBright,
  ChalkFunction,
  cyanBright,
  greenBright,
  magentaBright,
  redBright,
  grey,
  yellowBright,
} from 'chalk'
import { PolyhedralSides } from '../roll/types'

export const DICE_COLOURS: Record<PolyhedralSides, ChalkFunction> = {
  4: redBright,
  6: yellowBright,
  8: greenBright,
  10: cyanBright,
  12: blueBright,
  20: magentaBright,
  100: grey,
}
