const fs = require('fs')
const input = fs.readFileSync('./input1.txt', 'utf8').split('\n').map(line => line.split(' ')).map(line =>
  line.length > 1 ? [line[0], parseInt(line[1])] : line
)

const important = [20, 60, 100, 140, 180, 220]
let signalStrength = 0
let clock = 0
let x = 1

const compute = () => {
  clock++
  if (important.includes(clock)) signalStrength += (clock * x)
}

const part1 = () => {
  input.forEach((line, idx) => {
    if (line[0] === 'noop') {
      compute()
    } else {
      compute()
      compute()
      x += line[1]
    }
  })

  return signalStrength
}

console.log('Part 1:', part1())
