import { getConsistentPercentileValue } from '../../../roll/roll'

test('returns expected values for simple number pairings', async () => {
  expect(getConsistentPercentileValue(1, 1)).toBe(11)
  expect(getConsistentPercentileValue(2, 5)).toBe(25)
  expect(getConsistentPercentileValue(4, 7)).toBe(47)
  expect(getConsistentPercentileValue(8, 3)).toBe(83)
  expect(getConsistentPercentileValue(9, 9)).toBe(99)
})

test('treats tens value of 10 as 0', async () => {
  expect(getConsistentPercentileValue(10, 1)).toBe(1)
  expect(getConsistentPercentileValue(10, 2)).toBe(2)
  expect(getConsistentPercentileValue(10, 5)).toBe(5)
  expect(getConsistentPercentileValue(10, 9)).toBe(9)
})

test('treats unit value of 10 as 10', async () => {
  expect(getConsistentPercentileValue(1, 10)).toBe(20)
  expect(getConsistentPercentileValue(3, 10)).toBe(40)
  expect(getConsistentPercentileValue(7, 10)).toBe(80)
  expect(getConsistentPercentileValue(9, 10)).toBe(100)
})

test('treats two 10 values as 10', async () => {
  expect(getConsistentPercentileValue(10, 10)).toBe(10)
})
