const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').split(',').map(num => parseInt(num)).sort((a, b) => a - b)

const avg = (nums) => {
  const sum = nums.reduce((acc, num) => acc += num, 0)
  return sum / (nums.length)
}

const median = (nums) => nums[(nums.length)/2]

const part1 = () => {
  const target_pos = median(input)
  return input.reduce((acc, pos) => acc + Math.abs(target_pos - pos), 0)
}

const getCost = (target) => {
  return input.reduce((acc, pos) => {
    const distance = Math.abs(target - pos)
    return acc + ((Math.pow(distance, 2) + distance)/2)
  }, 0)
}

const part2 = () => {
    const avg_position = avg(input)

    const cost1 = getCost(Math.ceil(avg_position))
    const cost2 = getCost(Math.floor(avg_position))
    
    return cost1 < cost2 ? cost1 : cost2
}

console.log('Part 1:', part1()) // Part 1: 342730
console.log('Part 2:', part2()) // Part 2: 92335207
