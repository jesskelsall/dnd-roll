import { collectArguments } from './argv'

const maths = collectArguments(process.argv)

console.dir(maths)
