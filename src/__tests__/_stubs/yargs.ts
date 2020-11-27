import { Yargs } from '../../options/types'

export const equationYargs: Yargs[] = [
  {
    _: ['d6'],
    percentile: 'exception',
  },
  {
    _: ['d20'],
    percentile: 'exception',
  },
  {
    _: ['d100'],
    percentile: 'exception',
  },
  {
    _: ['2d8'],
    percentile: 'exception',
  },
  {
    _: ['3d10', '+', 1],
    percentile: 'exception',
  },
  {
    _: ['6d4', '-', 1],
    percentile: 'exception',
  },
  {
    _: ['3d8', '+', 'd6', '+', 2],
    percentile: 'exception',
  },
]

export const percentileYargs: Yargs[] = [
  {
    _: ['percentile'],
    percentile: 'exception',
  },
  {
    _: ['percentile'],
    percentile: 'd100',
  },
  {
    _: ['percentile'],
    percentile: 'constant',
  },
  {
    _: ['percentile'],
    percentile: 'exception',
  },
  {
    _: ['percentile'],
    percentile: 'invalid',
  },
]

export const skillYargs: Yargs[] = [
  {
    _: ['skill'],
    percentile: 'exception',
  },
  {
    _: ['skill'],
    bonus: 0,
    percentile: 'exception',
  },
  {
    _: ['skill'],
    bonus: 2,
    percentile: 'exception',
  },
  {
    _: ['skill'],
    bonus: -1,
    percentile: 'exception',
  },
  {
    _: ['skill'],
    advantage: true,
    bonus: 0,
    percentile: 'exception',
  },
  {
    _: ['skill'],
    bonus: 0,
    disadvantage: true,
    percentile: 'exception',
  },
]

export const allYargs: Yargs[] = [
  ...equationYargs,
  ...percentileYargs,
  ...skillYargs,
]
