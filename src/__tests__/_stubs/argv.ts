import { Argv } from '../../options/types'

const padArgv = (parts: string[]) => ['node', 'dnd-roll', ...parts]

export const equationArgvs: Argv[] = [
  ['d6'],
  ['d20'],
  ['d100'],
  ['2d8'],
  ['3d10', '+', '1'],
  ['6d4', '-', '1'],
  ['3d8', '+', 'd6', '+', '2'],
].map(padArgv)

export const percentileArgvs: Argv[] = [
  ['percentile'],
  ['percentile', '--percentile', 'd100'],
  ['percentile', '--percentile', 'consistent'],
  ['percentile', '--percentile', 'exception'],
  ['percentile', '--percentile', 'invalid'],
].map(padArgv)

export const skillArgvs: Argv[] = [
  ['skill'],
  ['skill', '0'],
  ['skill', '2'],
  ['skill', '-1'],
  ['skill', '--advantage'],
  ['skill', '--disadvantage'],
].map(padArgv)
