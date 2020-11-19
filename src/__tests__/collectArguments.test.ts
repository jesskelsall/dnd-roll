import { collectArguments } from '../argv'

const mockArgv = (args: string[]) => ['node', 'execution/path', ...args]

test('returns a string of space separated arguments', async () => {
  expect(collectArguments(mockArgv(['d6']))).toBe('d6')
  expect(collectArguments(mockArgv(['2d8']))).toBe('2d8')
  expect(collectArguments(mockArgv(['d10', '+', '1']))).toBe('d10 + 1')
  expect(collectArguments(mockArgv(['3d12', '-', '1']))).toBe('3d12 - 1')
})

test('returns an empty string when there are no arguments', async () => {
  expect(collectArguments(mockArgv([]))).toBe('')
})
