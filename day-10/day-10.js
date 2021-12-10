const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').split('\n')

const points1 = { ')': 3, ']': 57, '}': 1197, '>': 25137 }
const points2 = { ')': 1, ']': 2, '}': 3, '>': 4 }
const opening = ['(', '[', '{', '<']
const closing = [')', ']', '}', '>']

const firstIllegalChar = (line) => {
  const stack = []
  for (const char of line) {
    if (opening.includes(char)) {
      stack.push(char)
    } else {
      const last_opening = stack[stack.length-1]
      if (opening.indexOf(last_opening) === closing.indexOf(char)) {
        stack.pop()
      } else {
        return char
      }
    }
  }
}

const part1 = () =>
  input.reduce((acc, line) => {
    const char = firstIllegalChar(line)
    return acc + (char ? points1[char] : 0)
  }, 0)

const completeLine = (line) => {
  const stack = []
  const ending = []
  line.split('').forEach(char => {
    if (opening.includes(char)) {
      stack.push(char)
    } else {
      stack.pop()
    }
  })

  for (let i = stack.length-1; i >= 0; i--) {
    const idx = opening.indexOf(stack[i])
    ending.push(closing[idx])
  }

  return ending
}

const calculateScore = (ending) => ending.reduce((acc, char) => (acc*5) + points2[char], 0)

const median = (scores) => scores[Math.floor((scores.length)/2)]

const part2 = () => {
  const scores = input
    .filter(line => !firstIllegalChar(line))
    .map(line => calculateScore(completeLine(line)))
    .sort((a, b) => a-b)

  return median(scores)
}

console.log('Part 1:', part1()) // Part 1: 339411
console.log('Part 2:', part2()) // Part 2: 2289754624
