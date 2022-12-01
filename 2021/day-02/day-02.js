const fs = require('fs')

const input = fs.readFileSync('./input-1.txt', 'utf8').split('\n').map((line) => {
  const directions = line.split(' ')
  return { direction: directions[0], distance: parseInt(directions[1])}
})

const part1 = (input) => {
  const input_length = input.length
  let horizontal = 0
  let depth = 0

  for (let i = 0; i < input_length; i++) {
    switch(input[i]['direction']) {
      case 'forward':
        horizontal += input[i]['distance']
        break;
      case 'up':
        depth -= input[i]['distance']
        break;
      case 'down':
        depth += input[i]['distance']
    }
  }

  return horizontal * depth
}

const part2 = (input) => {
  const input_length = input.length
  let horizontal = 0
  let depth = 0
  let aim = 0

  for (let i = 0; i < input_length; i++) {
    switch(input[i]['direction']) {
      case 'forward':
        horizontal += input[i]['distance']
        depth += (aim * input[i]['distance'])
        break;
      case 'up':
        aim -= input[i]['distance']
        break;
      case 'down':
        aim += input[i]['distance']
    }
  }

  return horizontal * depth
}

console.log("Part 1:", part1(input)) // Part 1: 1427868
console.log("Part 2:", part2(input)) // Part 2: 1568138742
