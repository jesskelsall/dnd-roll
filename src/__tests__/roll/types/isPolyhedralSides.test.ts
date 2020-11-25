import { isPolyhedralSides } from '../../../roll/types'

test('returns true with a PolyhedralSides number', async () => {
  expect(isPolyhedralSides(4)).toBe(true)
  expect(isPolyhedralSides(6)).toBe(true)
  expect(isPolyhedralSides(8)).toBe(true)
  expect(isPolyhedralSides(10)).toBe(true)
  expect(isPolyhedralSides(12)).toBe(true)
  expect(isPolyhedralSides(20)).toBe(true)
  expect(isPolyhedralSides(100)).toBe(true)
})

test('returns false with any other number', async () => {
  expect(isPolyhedralSides(-20)).toBe(false)
  expect(isPolyhedralSides(0)).toBe(false)
  expect(isPolyhedralSides(1)).toBe(false)
  expect(isPolyhedralSides(3)).toBe(false)
  expect(isPolyhedralSides(47)).toBe(false)
  expect(isPolyhedralSides(101)).toBe(false)
})
