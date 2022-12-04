const fs = require('fs')
const pairs = fs.readFileSync('./input2.txt', 'utf8').split('\n')
  .map(pair => pair.split(',').map(section => section.split('-').map(item => parseInt(item))))

const pairFullyContained = (pair1, pair2) =>
  (pair1[0] >= pair2[0] && pair1[1] <= pair2[1]) || (pair1[0] <= pair2[0] && pair1[1] >= pair2[1])

const pairsOverlap = (pair1, pair2) =>
  ((pair1[0] >= pair2[0]) && (pair1[0] <= pair2[1])) || ((pair1[1] >= pair2[0]) && (pair1[1] <= pair2[1]))

const part1 = () =>
  pairs.reduce((acc, pair) => pairFullyContained(pair[0], pair[1]) ? acc + 1 : acc, 0)

const part2 = () =>
  pairs.reduce((acc, pair) =>
    (pairsOverlap(pair[0], pair[1]) || pairFullyContained(pair[0], pair[1]))
      ? acc + 1
      : acc
  , 0)

console.log('Part 1:', part1()) // Part 1: 576
console.log('Part 2:', part2()) // Part 2: 905
