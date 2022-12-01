
const fs = require('fs')
const elves = fs.readFileSync('./input2.txt', 'utf8').split('\n\n').map((inventory) => { return inventory.split('\n') })

const calories = elves.map(elf => 
  elf.reduce((acc, food) => { return acc + parseInt(food) }, 0)
).sort((a, b) => { return b - a })

const part1 = () => calories[0]
const part2 = () => calories[0] + calories[1] + calories[2]

console.log('Part 1:', part1()) // Part 1: 73211
console.log('Part 2:', part2()) // Part 2: 213958
