const fs = require('fs')
const input = fs.readFileSync('./input1.txt', 'utf8')

const part1 = () => {
  const message = [...input]
  let idx = 4
  const chunk = []
  for (let i = 0; i < 4; i++) {
    chunk.push(message.shift())
  }
  
  while (message.length > 3) {
    if (new Set(chunk).size === 4) return idx

    chunk.shift()
    chunk.push(message.shift())
    idx++
  }
}

const part2 = () => {
  const message = [...input]
  let idx = 14
  const chunk = []
  for (let i = 0; i < 14; i++) {
    chunk.push(message.shift())
  }

  while (message.length > 13) {
    if (new Set(chunk).size === 14) return idx

    chunk.shift()
    chunk.push(message.shift())
    idx++
  }
}

console.log('Part 1:', part1()) // Part 1: 1779
console.log('Part 2:', part2()) // Part 2: 2635
