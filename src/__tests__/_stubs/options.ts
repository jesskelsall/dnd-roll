import { Options } from '../../options/types'

export const equationOptions: Options[] = [
  {
    d100Method: 'exception',
    equation: 'd6',
    modifier: null,
  },
  {
    d100Method: 'exception',
    equation: 'd20',
    modifier: null,
  },
  {
    d100Method: 'exception',
    equation: 'd100',
    modifier: null,
  },
  {
    d100Method: 'exception',
    equation: '2d8',
    modifier: null,
  },
  {
    d100Method: 'exception',
    equation: '3d10 + 1',
    modifier: null,
  },
  {
    d100Method: 'exception',
    equation: '6d4 - 1',
    modifier: null,
  },
  {
    d100Method: 'exception',
    equation: '3d8 + d6 + 2',
    modifier: null,
  },
]

export const percentileOptions: Options[] = [
  {
    d100Method: 'exception',
    equation: '',
    modifier: null,
  },
  {
    d100Method: 'd100',
    equation: '',
    modifier: null,
  },
  {
    d100Method: 'consistent',
    equation: '',
    modifier: null,
  },
  {
    d100Method: 'exception',
    equation: '',
    modifier: null,
  },
  {
    d100Method: 'exception',
    equation: '',
    modifier: null,
  },
]

export const skillOptions: Options[] = [
  {
    bonus: 0,
    d100Method: 'exception',
    equation: '',
    modifier: null,
  },
  {
    bonus: 0,
    d100Method: 'exception',
    equation: '',
    modifier: null,
  },
  {
    bonus: 2,
    d100Method: 'exception',
    equation: '',
    modifier: null,
  },
  {
    bonus: -1,
    d100Method: 'exception',
    equation: '',
    modifier: null,
  },
  {
    bonus: 0,
    d100Method: 'exception',
    equation: '',
    modifier: 'advantage',
  },
  {
    bonus: 0,
    d100Method: 'exception',
    equation: '',
    modifier: 'disadvantage',
  },
]
