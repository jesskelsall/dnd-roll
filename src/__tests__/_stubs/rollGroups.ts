import {
  DoubleD20RollGroup, SingleRollGroup, PercentileRollGroup, RollGroup,
} from '../../roll/types'

export const singleRollGroups: SingleRollGroup[] = [
  {
    sides: 6,
    rolls: [
      {
        diceRoll: 4,
        value: 4,
      },
    ],
    total: 4,
  },
  {
    sides: 12,
    rolls: [
      {
        diceRoll: 6,
        value: 6,
      },
      {
        diceRoll: 8,
        value: 8,
      },
    ],
    total: 14,
  },
  {
    sides: 8,
    rolls: [
      {
        diceRoll: 7,
        value: 7,
      },
      {
        diceRoll: 6,
        value: 6,
      },
      {
        diceRoll: 5,
        value: 5,
      },
      {
        diceRoll: 5,
        value: 5,
      },
      {
        diceRoll: 8,
        value: 8,
      },
    ],
    total: 31,
  },
]

export const doubleRollGroups: DoubleD20RollGroup[] = [
  {
    modifier: 'advantage',
    sides: 20,
    rolls: [
      {
        diceRoll: 7,
        secondRoll: 18,
        value: 18,
      },
    ],
    total: 18,
  },
  {
    modifier: 'disadvantage',
    sides: 20,
    rolls: [
      {
        diceRoll: 2,
        secondRoll: 16,
        value: 2,
      },
      {
        diceRoll: 19,
        secondRoll: 13,
        value: 13,
      },
    ],
    total: 15,
  },
]

export const percentileRollGroups: PercentileRollGroup[] = [
  {
    sides: 100,
    rolls: [
      {
        diceRoll: 8,
        tensRoll: 3,
        value: 38, // Either percentile method
      },
    ],
    total: 38,
  },
  {
    sides: 100,
    rolls: [
      {
        diceRoll: 10,
        tensRoll: 10,
        value: 10, // Consistent
      },
    ],
    total: 10,
  },
  {
    sides: 100,
    rolls: [
      {
        diceRoll: 10,
        tensRoll: 10,
        value: 100, // Exception
      },
    ],
    total: 100,
  },
]

export const allRollGroups: RollGroup[] = [
  ...singleRollGroups,
  ...doubleRollGroups,
  ...percentileRollGroups,
]
