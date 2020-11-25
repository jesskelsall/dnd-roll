import { DoubleD20RollGroup, SingleRollGroup, PercentileRollGroup } from '../../roll/types'

export const singleRollGroup: SingleRollGroup = {
  sides: 6,
  rolls: [
    {
      diceRoll: 4,
      value: 4,
    },
  ],
  total: 4,
}

export const doubleRollGroup: DoubleD20RollGroup = {
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
}

export const percentileRollGroup: PercentileRollGroup = {
  sides: 100,
  rolls: [
    {
      diceRoll: 8,
      tensRoll: 3,
      value: 38,
    },
  ],
  total: 38,
}
