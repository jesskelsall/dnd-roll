import { isPercentileRollGroup } from '../../../roll/types'
import { doubleRollGroup, normalRollGroup, percentileRollGroup } from '../../_stubs/rollGroups'

test('returns true with a PercentileRollGroup', async () => {
  expect(isPercentileRollGroup(percentileRollGroup)).toBe(true)
})

test('returns false with a NormalRollGroup', async () => {
  expect(isPercentileRollGroup(normalRollGroup)).toBe(false)
})

test('returns false with a DoubleD20RollGroup', async () => {
  expect(isPercentileRollGroup(doubleRollGroup)).toBe(false)
})
