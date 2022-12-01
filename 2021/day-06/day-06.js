const fs = require('fs')

const input1 = fs.readFileSync('./sample-input.txt', 'utf8').split(',').map(num => parseInt(num))
const input2 = fs.readFileSync('./input.txt', 'utf8').split(',').reduce((acc, num) => {
  acc[num]++
  return acc
}, { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 })

const part1 = (input, days) => {
  const growing = [...input]
  for (let i = 0; i < days; i++) {
    let new_feesh = []
    for (let j = 0; j < growing.length; j++) {
      if (growing[j] === 0) {
        growing[j] = 6
        new_feesh.push(8)
      } else {
        growing[j]--
      }
    }
    growing.push(...new_feesh)
  }
  return growing.length
}

const part2 = (input, days) => {
  let growing = JSON.parse(JSON.stringify(input))
  for (let i = 0; i < days; i++) {
    const next_day = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
    for (let j = 8; j > 0; j--) { next_day[j-1] = growing[j] }
    next_day[8] = growing[0]
    next_day[6] += growing[0]
    growing = next_day
  }

  return Object.keys(growing).reduce((acc, i) => acc + growing[i], 0)
}

console.log('Part 1:', part1(input1, 80)) // Part 1: 5934
console.log('Part 2:', part2(input2, 256)) // Part 2: 1710166656900
