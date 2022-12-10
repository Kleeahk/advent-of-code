const fs = require('fs')
const input = fs.readFileSync('./input1.txt', 'utf8').split('\n').map(line => line.split(' ')).map(line =>
  line.length > 1 ? [line[0], parseInt(line[1])] : line
)

const screen = Array(241).fill('.')
let clock = 0
let x = 1
const width = 40
const height = 6

const printScreen = () => {
  let start = 0
  let end = width
  for (let i = 0; i < height; i++) {
    console.log(screen.slice(start, end).join(' '))
    start += width
    end += width
  }
}

const compute = () => {
  clock++
  const spritePosition = [x-1, x, x+1]
  const col = (clock - 1) % 40

  if (spritePosition.includes(col)) screen[clock - 1] = '#'
}

const part2 = () => {
  input.forEach(line => {
    if (line[0] === 'noop') {
      compute()
    } else {
      compute()
      compute()
      x += line[1]
    }
  })

  printScreen()
}

console.log('Part 2:')
part2()
