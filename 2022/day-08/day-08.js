const fs = require('fs')
const input = fs.readFileSync('./input2.txt', 'utf8').split('\n').map(line => line.split('').map(tree => parseInt(tree)))
const lastRow = input[0].length - 1
const lastCol = input.length - 1

const isVisibleFromEdge = (row, col) => {
  const size = input[row][col]

  // Always visible if on an edge
  if ([0, lastRow].includes(row) || [0, lastCol].includes(col))
    return true

  // up
  let visible = true
  for (let i = 0; i < row; i++)
    if (input[i][col] >= size) visible = false
  if (visible) return true

  // down
  visible = true
  for (let i = row + 1; i <= lastRow; i++)
    if (input[i][col] >= size) visible = false
  if (visible) return true

  // left
  visible = true
  for (let i = 0; i < col; i++)
    if (input[row][i] >= size) visible = false
  if (visible) return true

  // right
  visible = true
  for (let i = col + 1; i <= lastCol; i++)
    if (input[row][i] >= size) visible = false

  return visible
}

const part1 = () => {
  let visibleTrees = 0
  input.forEach((row, rowidx) => {
    row.forEach((height, colidx) => {
      visibleTrees += isVisibleFromEdge(rowidx, colidx) ? 1 : 0
    })
  })

  return visibleTrees
}

const scenicScore = (row, col) => {
  const size = input[row][col]
  let up = 0
  let down = 0
  let left = 0
  let right = 0

  // Always 0 if on an edge
  if ([0, lastRow].includes(row) || [0, lastCol].includes(col))
    return 0

  // up
  let visible = true
  for (let i = row - 1; i >= 0; i--) {
    if (visible) {
      up++
      if (input[i][col] >= size) visible = false
    }
  }

  // down
  visible = true
  for (let i = row + 1; i <= lastRow; i++) {
    if (visible) {
      down++
      if (input[i][col] >= size) visible = false
    }
  }

  // left
  visible = true
  for (let i = col - 1; i >= 0; i--) {
    if (visible) {
      left++
      if (input[row][i] >= size) visible = false
    }
  }

  // right
  visible = true
  for (let i = col + 1; i <= lastCol; i++) {
    if (visible) {
      right++
      if (input[row][i] >= size) visible = false
    }
  }
  return (up * down * left * right)
}

const part2 = () => {
  let maxScenicScore = 0;
  input.forEach((row, rowidx) => {
    row.forEach((height, colidx) => {
      const currentScenicScore = scenicScore(rowidx, colidx)
      maxScenicScore = currentScenicScore > maxScenicScore ? currentScenicScore : maxScenicScore
    })
  })

  return maxScenicScore
}

console.log('Part 1:', part1()) // Part 1: 1782
console.log('Part 2:', part2()) // Part 2: 474606
