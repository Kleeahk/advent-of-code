const fs = require('fs')
const input = fs.readFileSync('./input2.txt', 'utf8').split('\n').map(line => line.split(' ')).map(line => [line[0], parseInt(line[1])])
const tailMap = {'0,0': 1}

const knots1 = [
  {row: 0, col: 0},
  {row: 0, col: 0}
]

const knots2 = [
  {row: 0, col: 0},
  {row: 0, col: 0},
  {row: 0, col: 0},
  {row: 0, col: 0},
  {row: 0, col: 0},
  {row: 0, col: 0},
  {row: 0, col: 0},
  {row: 0, col: 0},
  {row: 0, col: 0},
  {row: 0, col: 0}
]

const moveKnot = (knots, head) => {
  let newKnotRow = knots[head + 1]['row']
  let newKnotCol = knots[head + 1]['col']
  const rowDiff = knots[head]['row'] - newKnotRow
  const colDiff = knots[head]['col'] - newKnotCol

  // no move
  if ((Math.abs(rowDiff) < 2) && (Math.abs(colDiff) < 2))
    return

  if ((Math.abs(rowDiff) == 2) && (Math.abs(colDiff) == 2)) {
    newKnotRow += (rowDiff / 2)
    newKnotCol += (colDiff / 2)
  } else if (rowDiff == 2) {
    newKnotRow++
    newKnotCol += colDiff
  } else if (rowDiff == -2) {
    newKnotRow--
    newKnotCol += colDiff
  } else if (colDiff == 2) {
    newKnotCol++
    newKnotRow += rowDiff
  } else if (colDiff == -2) {
    newKnotCol--
    newKnotRow += rowDiff
  }

  if (head === (knots.length - 2)) {
    const newTailPos = `${newKnotRow},${newKnotCol}`
    if (!(newTailPos in tailMap)) {
      tailMap[newTailPos] = 0
    }
    tailMap[newTailPos]++
  }

  knots[head + 1]['row'] = newKnotRow
  knots[head + 1]['col'] = newKnotCol
}

const moveHead = (knots, dir) => {
  switch (dir) {
    case 'U':
      knots[0]['row']++
      break
    case 'D':
      knots[0]['row']--
      break
    case 'L':
      knots[0]['col']--
      break
    case 'R':
      knots[0]['col']++
      break
  }
  
  for (let i = 0; i < knots.length - 1; i++) {
    moveKnot(knots, i)
  }
}

const part1 = () => {
  input.forEach(line => {
    for (let i = 0; i < line[1]; i++) {
      moveHead(knots1, line[0])
    }
  })
  return Object.keys(tailMap).length
}

const part2 = () => {
  input.forEach(line => {
    for (let i = 0; i < line[1]; i++) {
      moveHead(knots2, line[0])
    }
  })
  return Object.keys(tailMap).length
}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
