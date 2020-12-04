import chalk from 'chalk'
import ansiStyles from 'ansi-styles'
import stripAnsi from 'strip-ansi'
import { displayResult } from '../../../equation/display'
import { EquationParts } from '../../../equation/types'

const consoleSpy = jest.spyOn(console, 'info').mockImplementation(jest.fn())

afterAll(() => {
  consoleSpy.mockClear()
})

const equationsAndResults: {
  equationParts: EquationParts,
  result: number,
}[] = [
  {
    equationParts: ['2', '+', '2'],
    result: 4,
  },
  {
    equationParts: [chalk.yellowBright('5')],
    result: 5,
  },
  {
    equationParts: [chalk.blueBright('10'), '-', '2'],
    result: 8,
  },
  {
    equationParts: [chalk.greenBright('37'), '+', chalk.yellowBright('4'), '-', '1'],
    result: 40,
  },
]

test('calls console.info with the joined equation', async () => {
  expect.assertions(equationsAndResults.length * 2 + 1)

  const joinedEquations = [
    '2 + 2',
    '5',
    '10 - 2',
    '37 + 4 - 1',
  ]

  expect(joinedEquations).toHaveLength(equationsAndResults.length)

  joinedEquations.forEach((joinedEquation, index) => {
    const { equationParts, result } = equationsAndResults[index]
    displayResult(equationParts, result)

    expect(consoleSpy).toHaveBeenCalled()
    expect(stripAnsi(consoleSpy.mock.calls[0][0]).startsWith(joinedEquation)).toBeTruthy()

    consoleSpy.mockClear()
  })
})

test('calls console.info with the result', async () => {
  expect.assertions(equationsAndResults.length * 2 + 1)

  const results = [
    '4',
    '5',
    '8',
    '40',
  ]

  expect(results).toHaveLength(equationsAndResults.length)

  results.forEach((outputResult, index) => {
    const { equationParts, result } = equationsAndResults[index]
    displayResult(equationParts, result)

    expect(consoleSpy).toHaveBeenCalled()
    expect(consoleSpy.mock.calls[0][0].endsWith(` = ${outputResult}`)).toBeTruthy()

    consoleSpy.mockClear()
  })
})

test('calls console.info with coloured dice notation results', async () => {
  expect.assertions(equationsAndResults.length * 2 + 1)

  const colouredEquations = [
    '2 + 2',
    `${ansiStyles.yellowBright.open}5${ansiStyles.yellowBright.close}`,
    `${ansiStyles.blueBright.open}10${ansiStyles.blueBright.close} - 2`,
    [
      `${ansiStyles.greenBright.open}37${ansiStyles.greenBright.close}`,
      '+',
      `${ansiStyles.yellowBright.open}4${ansiStyles.yellowBright.close}`,
      '- 1',
    ].join(' '),
  ]

  expect(colouredEquations).toHaveLength(equationsAndResults.length)

  colouredEquations.forEach((colouredEquation, index) => {
    const { equationParts, result } = equationsAndResults[index]
    displayResult(equationParts, result)

    expect(consoleSpy).toHaveBeenCalled()
    expect(consoleSpy.mock.calls[0][0].startsWith(colouredEquation)).toBeTruthy()

    consoleSpy.mockClear()
  })
})
