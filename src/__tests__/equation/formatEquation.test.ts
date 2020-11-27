import { formatEquation } from '../../equation/format'

test('removes spaces in dice notation', async () => {
  expect(formatEquation('d 20')).toBe('d20')
  expect(formatEquation('2 d10')).toBe('2d10')
  expect(formatEquation('3 d 8')).toBe('3d8')
  expect(formatEquation('3  d6')).toBe('3d6')
})

test('converts percentile dice formats into a consistent d100', async () => {
  expect(formatEquation('d%')).toBe('d100')
  expect(formatEquation('d100')).toBe('d100')
  expect(formatEquation('percentile')).toBe('d100')
})

test('converts addition of negative numbers to subtraction of positive numbers', async () => {
  expect(formatEquation('d6 + -1')).toBe('d6 - 1')
  expect(formatEquation('d6 +-2')).toBe('d6 - 2')
  expect(formatEquation('d6 + - 3')).toBe('d6 - 3')
})

test('converts subtraction of negative numbers to addition of positive numbers', async () => {
  expect(formatEquation('d8 - -1')).toBe('d8 + 1')
  expect(formatEquation('d8 --2')).toBe('d8 + 2')
  expect(formatEquation('d8 - - 3')).toBe('d8 + 3')
})

test('ensures one space either side of each operator', async () => {
  expect(formatEquation('2+2')).toBe('2 + 2')
  expect(formatEquation(' 2 + 2')).toBe('2 + 2')
  expect(formatEquation('2 + 2 ')).toBe('2 + 2')
  expect(formatEquation('2d6+5')).toBe('2d6 + 5')
  expect(formatEquation('3d10+d6-5')).toBe('3d10 + d6 - 5')
})
