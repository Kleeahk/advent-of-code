const fs = require('fs')

const length_sort = (a, b) => a.length - b.length

const input = fs.readFileSync('./input.txt', 'utf8').split('\n').map(line => {
  const split_line = line.split(' | ').map(s => s.split(' '))
  return { patterns: split_line[0].sort(length_sort).map(pattern => pattern.split('')), output: split_line[1].map(pattern => pattern.split('')) }
})

const has_unique_length = (digit) => {
  switch(digit.length) {
    case 2:
    case 3:
    case 4:
    case 7:
      return true
    default:
      return false
  }
}

const part1 = () => {
  return input.reduce((acc, line) => {
    return acc + line.output.reduce((acc, digit) => has_unique_length(digit) ? acc + 1 : acc, 0)
  }, 0)
}

const real_digits = {
  'abcefg': '0',
  'cf': '1',
  'acdeg': '2',
  'acdfg': '3',
  'bcdf': '4',
  'abdfg': '5',
  'abdefg': '6',
  'acf': '7',
  'abcdefg': '8',
  'abcdfg': '9'
}

const unique_lengths = {
  2: ['c', 'f'],
  3: ['a', 'c', 'f'],
  4: ['b', 'c', 'd', 'f']
}

const occurrences = {
  4: ['e'],
  6: ['b'],
  7: ['d', 'g'],
  8: ['a', 'c'],
  9: ['f']
}

const removeLetter = (arr, letter) => {
  const idx = arr.indexOf(letter)
  if (idx === -1) { return arr }
  arr.splice(idx, 1)
  return arr
}

const digit_output = (digits, letter_map) => {
  const output = digits.reduce((acc, display) => {
    const actual = [...display.map(char => letter_map[char])]
    return acc + real_digits[actual.sort().join('')]
  }, '')

  return parseInt(output)
}

const part2 = () => {
  return input.reduce((acc, line) => {

    const letter_ocurrences = line.patterns.flat().reduce((acc, char) => {
      acc[char]++
      return acc
    }, { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 })

    const letter_map = Object.keys(letter_ocurrences).reduce((acc, char) => {
      acc[char] = [...occurrences[letter_ocurrences[char]]]
      return acc
    }, {})

    const bad_two = [...line.patterns[0]]
    const actual_two = [...unique_lengths[2]]
    if (letter_map[bad_two[0]].length === 1) {
      letter_map[bad_two[1]] = removeLetter(actual_two, letter_map[bad_two[0]][0])
      Object.keys(letter_map).filter(l => letter_map[l].length > 1).forEach(l => letter_map[l] = removeLetter(letter_map[l], letter_map[bad_two[1]][0]))
    } else {
      letter_map[bad_two[0]] = removeLetter(actual_two, letter_map[bad_two[1]][0])
      Object.keys(letter_map).filter(l => letter_map[l].length > 1).forEach(l => letter_map[l] = removeLetter(letter_map[l], letter_map[bad_two[0]][0]))
    }

    const bad_four = [...line.patterns[2]]
    const bad_remaining = Object.keys(letter_map).filter(l => letter_map[l].length > 1)

    if (bad_four.includes(bad_remaining[0])) {
      letter_map[bad_remaining[0]] = ['d']
      letter_map[bad_remaining[1]] = removeLetter(letter_map[bad_remaining[1]], 'd')
    } else {
      letter_map[bad_remaining[1]] = ['d']
      letter_map[bad_remaining[0]] = removeLetter(letter_map[bad_remaining[0]], 'd')
    }

    return acc + digit_output(line.output, letter_map)
  }, 0)
}

console.log('Part 1:', part1()) // Part 1: 473
console.log('Part 2:', part2()) // Part 2: 1097568
