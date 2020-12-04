import { isDoubleRollGroup } from '../../../roll/types'
import { doubleRollGroups, percentileRollGroups, singleRollGroups } from '../../_stubs/rollGroups'

test('returns true with a DoubleD20RollGroup', async () => {
  expect.assertions(doubleRollGroups.length)

  doubleRollGroups.forEach((group) => {
    expect(isDoubleRollGroup(group)).toBe(true)
  })
})

test('returns false with a SingleRollGroup', async () => {
  expect.assertions(singleRollGroups.length)

  singleRollGroups.forEach((group) => {
    expect(isDoubleRollGroup(group)).toBe(false)
  })
})

test('returns false with a PercentileRollGroup', async () => {
  expect.assertions(percentileRollGroups.length)

  percentileRollGroups.forEach((group) => {
    expect(isDoubleRollGroup(group)).toBe(false)
  })
})
