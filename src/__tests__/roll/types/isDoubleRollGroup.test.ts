import { isDoubleRollGroup } from '../../../roll/types'
import { doubleRollGroup, normalRollGroup, percentileRollGroup } from '../../_stubs/rollGroups'

test('returns true with a DoubleD20RollGroup', async () => {
  expect(isDoubleRollGroup(doubleRollGroup)).toBe(true)
})

test('returns false with a NormalRollGroup', async () => {
  expect(isDoubleRollGroup(normalRollGroup)).toBe(false)
})

test('returns false with a PercentileRollGroup', async () => {
  expect(isDoubleRollGroup(percentileRollGroup)).toBe(false)
})
