import { isPercentileRollGroup } from '../../../roll/types'
import { doubleRollGroup, percentileRollGroup, singleRollGroup } from '../../_stubs/rollGroups'

test('returns true with a PercentileRollGroup', async () => {
  expect(isPercentileRollGroup(percentileRollGroup)).toBe(true)
})

test('returns false with a SingleRollGroup', async () => {
  expect(isPercentileRollGroup(singleRollGroup)).toBe(false)
})

test('returns false with a DoubleD20RollGroup', async () => {
  expect(isPercentileRollGroup(doubleRollGroup)).toBe(false)
})
