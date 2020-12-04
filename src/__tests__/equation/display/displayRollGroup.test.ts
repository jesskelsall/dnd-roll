import ansiStyles from 'ansi-styles'
import stripAnsi from 'strip-ansi'
import { displayRollGroup } from '../../../equation/display'
import { PolyhedralSides } from '../../../roll/types'
import { allRollGroups } from '../../_stubs/rollGroups'

const diceColourStyles: {
  colour: ansiStyles.CSPair,
  sides: PolyhedralSides,
}[] = [
  { sides: 4, colour: ansiStyles.redBright },
  { sides: 6, colour: ansiStyles.yellowBright },
  { sides: 8, colour: ansiStyles.greenBright },
  { sides: 10, colour: ansiStyles.cyanBright },
  { sides: 12, colour: ansiStyles.blueBright },
  { sides: 20, colour: ansiStyles.magentaBright },
  { sides: 100, colour: ansiStyles.grey },
]

const createSingleRollGroup = (sides: PolyhedralSides) => ({
  sides,
  rolls: [{
    diceRoll: 1,
    value: 1,
  }],
  total: 1,
})

test('returns the RollGroup total', async () => {
  expect.assertions(allRollGroups.length)

  allRollGroups.forEach((group) => {
    expect(stripAnsi(displayRollGroup(group))).toBe(`${group.total}`)
  })
})

test('returns a string colour relating to the number of sides on the dice', async () => {
  expect.assertions(diceColourStyles.length)

  diceColourStyles.forEach(({ colour, sides }) => {
    const result = displayRollGroup(createSingleRollGroup(sides))

    expect(result).toBe(`${colour.open}1${colour.close}`)
  })
})
