import { getExceptionPercentileValue } from '../../../roll/roll'

test('returns expected values for simple number pairings', async () => {
  expect(getExceptionPercentileValue(1, 1)).toBe(11)
  expect(getExceptionPercentileValue(2, 5)).toBe(25)
  expect(getExceptionPercentileValue(4, 7)).toBe(47)
  expect(getExceptionPercentileValue(8, 3)).toBe(83)
  expect(getExceptionPercentileValue(9, 9)).toBe(99)
})

test('treats tens value of 10 as 0', async () => {
  expect(getExceptionPercentileValue(10, 1)).toBe(1)
  expect(getExceptionPercentileValue(10, 2)).toBe(2)
  expect(getExceptionPercentileValue(10, 6)).toBe(6)
  expect(getExceptionPercentileValue(10, 9)).toBe(9)
})

test('treats unit value of 10 as 0', async () => {
  expect(getExceptionPercentileValue(1, 10)).toBe(10)
  expect(getExceptionPercentileValue(3, 10)).toBe(30)
  expect(getExceptionPercentileValue(7, 10)).toBe(70)
  expect(getExceptionPercentileValue(9, 10)).toBe(90)
})

test('treats two 10 values as 100', async () => {
  expect(getExceptionPercentileValue(10, 10)).toBe(100)
})
