const fs = require('fs')
const rounds = fs.readFileSync('./input2.txt', 'utf8').split('\n').map(round => round.split(' '))

const shapeScore = { 'X': 1, 'Y': 2, 'Z': 3 }
const winScore = (opponent, self) => {
  switch (`${opponent}${self}`) {
    case 'AY':
    case 'BZ':
    case 'CX':
      return 6
    case 'AX':
    case 'BY':
    case 'CZ':
      return 3
    case 'AZ':
    case 'BX':
    case 'CY':
      return 0
  }
}

const part1 = () =>
  rounds.reduce((acc, round) => {
    acc += shapeScore[round[1]]
    acc += winScore(round[0], round[1])
    return acc
  }, 0)

const scores = [1, 2, 3]
const indexes = { A: 0, B: 1, C: 2 }

const part2 = () =>
  rounds.reduce((acc, round) => {
    const scoreIdx = indexes[round[0]]
    switch (round[1]) {
      case 'X':
        acc += scores[((scoreIdx + 2) % 3)]
        break
      case 'Y':
        acc += 3
        acc += scores[scoreIdx]
        break
      case 'Z':
        acc += 6
        acc += scores[((scoreIdx + 1) % 3)]
        break
    }
    return acc
  }, 0)

console.log('Part 1:', part1()) // Part 1: 10994
console.log('Part 2:', part2()) // Part 2: 12526
