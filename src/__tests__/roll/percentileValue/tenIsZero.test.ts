import { tenIsZero } from '../../../roll/percentileValue'

test('returns the number if it is not 10', async () => {
  expect(tenIsZero(1)).toBe(1)
  expect(tenIsZero(2)).toBe(2)
  expect(tenIsZero(3)).toBe(3)
  expect(tenIsZero(4)).toBe(4)
  expect(tenIsZero(5)).toBe(5)
  expect(tenIsZero(6)).toBe(6)
  expect(tenIsZero(7)).toBe(7)
  expect(tenIsZero(8)).toBe(8)
  expect(tenIsZero(9)).toBe(9)
})

test('returns 0 if the number is 10', async () => {
  expect(tenIsZero(10)).toBe(0)
})
