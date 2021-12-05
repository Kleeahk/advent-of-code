const fs = require('fs')

let maxX = 0
let maxY = 0
const input = fs.readFileSync('./input-1.txt', 'utf8').split('\n').map(line =>
  line.split(' -> ').map(str => {
    const coords = str.split(',')
    const x = parseInt(coords[0])
    const y = parseInt(coords[1])
    if (x > maxX) { maxX = x }
    if (y > maxY) { maxY = y }
    return { x, y }
  })
)

const removeDiagonals = (input) => {
  return input.filter(coords => coords[0].x === coords[1].x || coords[0].y === coords[1].y)
}

const printMap = (map) => {
  map.forEach(row => {
    let line = ''
    row.forEach(val => { line += (val === 0) ? '.' : val })
    console.log(line)
  })
}

const buildMap = (input) => {
  const vent_map = Array.from(Array(maxY+1), () => Array(maxX+1).fill(0))

  input.forEach(row => {
    const x_dir = row[1].x === row[0].x
      ? 0
      : row[1].x - row[0].x > 0 ? 1 : -1
    const y_dir = row[1].y === row[0].y
      ? 0
      : row[1].y - row[0].y > 0 ? 1 : -1
    const delta = x_dir
      ? Math.abs(row[1].x - row[0].x)
      : Math.abs(row[1].y - row[0].y)

    for (let i = 0; i <= delta; i++) {
      vent_map[row[0].y + (y_dir * i)][row[0].x + (x_dir * i)]++
    }
  })
  return vent_map
}

const dangerCount = (vent_map) => {
  let danger_count = 0
  vent_map.forEach(row =>
    row.forEach(val => {
      if (val > 1) { danger_count++ }
    })
  )
  return danger_count
}

const part1 = () => {
  vent_map = buildMap(removeDiagonals(input))
  return dangerCount(vent_map)
}

const part2 = () => {
  vent_map = buildMap(input)
  return dangerCount(vent_map)
}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
