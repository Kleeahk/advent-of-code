const fs = require('fs')
const input = fs.readFileSync('./input2.txt', 'utf8').split('\n\n')
const stackInput = input[0].split('\n')
const instructions = input[1].split('\n')
  .map(instruction => instruction.split(' ')
    .map(instruction => parseInt(instruction))
    .filter(instruction => !isNaN(instruction))
  )

const numStacks = (stackInput[0].length + 1) / 4
const rowRegex = new RegExp(Array(numStacks).fill('(\\s{3}|\\[\\w\\])').join('\\s'), 'g')

const initStacks = () => {
  const stacks = Array.from(Array(numStacks), () => [])

  stackInput.forEach(row => {
    const results = Array.from(row.matchAll(rowRegex))
    if (results.length === 0) return // Ignore bottom label row
  
    results[0].forEach((item, key) => {
      const char = item.charAt(1)
      if (char !== ' ' && key > 0)
        stacks[key-1].push(char)
    })
  })

  return stacks
}

const part1 = () => {
  const stacks = initStacks()

  instructions.forEach(instruction => {
    const from = instruction[1] - 1
    const to = instruction[2] - 1
    for (let i = 0; i < instruction[0]; i++)
      stacks[to].unshift(stacks[from].shift())
  })

  return stacks.map(stack => stack.shift()).join('')
}

const part2 = () => {
  const stacks = initStacks()

  instructions.forEach(instruction => {
    const from = instruction[1] - 1
    const to = instruction[2] - 1
    const shifter = []
    for (let i = 0; i < instruction[0]; i++)
      shifter.push(stacks[from].shift())
    for (let i = 0; i < instruction[0]; i++)
      stacks[to].unshift(shifter.pop())
  })

  return stacks.map(stack => stack.shift()).join('')
}

console.log('Part 1:', part1()) // Part 1: MQSHJMWNH
console.log('Part 2:', part2()) // Part 2: LLWJRBHVZ
