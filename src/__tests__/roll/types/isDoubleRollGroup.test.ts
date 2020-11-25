import { isDoubleRollGroup } from '../../../roll/types'
import { doubleRollGroup, percentileRollGroup, singleRollGroup } from '../../_stubs/rollGroups'

test('returns true with a DoubleD20RollGroup', async () => {
  expect(isDoubleRollGroup(doubleRollGroup)).toBe(true)
})

test('returns false with a SingleRollGroup', async () => {
  expect(isDoubleRollGroup(singleRollGroup)).toBe(false)
})

test('returns false with a PercentileRollGroup', async () => {
  expect(isDoubleRollGroup(percentileRollGroup)).toBe(false)
})
