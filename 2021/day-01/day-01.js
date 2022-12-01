const fs = require('fs')

const input = fs.readFileSync('./input-1.txt', 'utf8').split('\n').map((line) => { return parseInt(line) })

const part1 = (input) => {
  input_length = input.length
  return input.reduce((acc, depth, i) => {
    if (i+1 < input_length && depth < input[i+1]) { acc++ }
    return acc
  }, 0)
}

const sumAtIndex = (input, i) => {
  return input[i] + input[i+1] + input[i+2]
}

const part2 = (input) => {
  input_length = input.length
  return input.reduce((acc, depth, i) => {
    if (i+3 < input_length && sumAtIndex(input, i) < sumAtIndex(input, i+1)) { acc++ }
    return acc
  }, 0)
}

console.log("Part 1", part1(input)) // Part 1 1529
console.log("Part 2", part2(input)) // Part 2 1567
