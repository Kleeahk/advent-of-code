const fs = require('fs')
const input = fs.readFileSync('./input2.txt', 'utf8').split('\n')

const rucksacks = input.map(rucksack => {
  const halfway = rucksack.length/2
  return [rucksack.substring(0, halfway), rucksack.substring(halfway)]
})

const itemPriority = (item) => {
  const charCode = item.charCodeAt(0)
  return charCode > 90 ? charCode - 96 : charCode - 38
}

const part1 = () =>
  rucksacks.reduce((acc, rucksack) => {
    const repeatItem = rucksack[0].split('').filter(item => rucksack[1].split('').includes(item))[0]
    return acc + itemPriority(repeatItem)
  }, 0)

const getGroups = () => {
  const groups = []
  const auxInput = [...input]
  while (auxInput.length > 0) {
    groups.push([auxInput.shift(), auxInput.shift(), auxInput.shift()])
  }
  return groups
}

const part2 = () => {
  const groups = getGroups()
  return groups.reduce((acc, group) => {
    const repeatItem = group[0].split('').filter(item => group[1].split('').includes(item)).filter(item => group[2].split('').includes(item))[0]
    return acc + itemPriority(repeatItem)
  }, 0)
}

console.log('Part 1:', part1()) // Part 1: 7831
console.log('Part 2:', part2()) // Part 2: 2683