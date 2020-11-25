import Joi from 'joi'
import { POLYHEDRAL_SIDES } from '../../../consts'
import { rollDie } from '../../../roll/roll'
import { polyhedralSides } from '../../_stubs/polyhedralSides'

test('returns a SingleRoll', async () => {
  expect.assertions(POLYHEDRAL_SIDES.length)

  const singleRollSchema = Joi.object().keys({
    diceRoll: Joi.number().required().integer().min(1),
    value: Joi.number().required().integer().min(1),
  })

  polyhedralSides.forEach((sides) => {
    expect(rollDie(sides)).toMatchJoiSchema(singleRollSchema)
  })
})

test('returns an object with matching diceRoll and value properties', async () => {
  expect.assertions(POLYHEDRAL_SIDES.length)

  polyhedralSides.forEach((sides) => {
    const result = rollDie(sides)
    expect(result.value).toBe(result.diceRoll)
  })
})
