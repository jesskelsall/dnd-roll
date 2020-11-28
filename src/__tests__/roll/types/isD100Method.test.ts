import { D100_METHODS } from '../../../consts'
import { isD100Method } from '../../../roll/types'

test('returns true with a D100Method', async () => {
  expect.assertions(D100_METHODS.length)

  D100_METHODS.forEach((method) => {
    expect(isD100Method(method)).toBe(true)
  })
})

test('returns false with anything else', async () => {
  expect(isD100Method('')).toBe(false)
  expect(isD100Method('d20')).toBe(false)
  expect(isD100Method('invalid method')).toBe(false)
})
