const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').split('\n').map(line => {
  return line.split('').map(n => parseInt(n))
})

const flash = (grid, row, col) => {
  for (let r = row-1; r < row+2; r++) {
    for (let c = col-1; c < col+2; c++) {
      if ((r >=0) && (r < 10) && (c >=0) && (c < 10) && ((r !== row) || (c !== col))) {
        grid[r][c]++

        if (grid[r][c] === 10) {
          flash(grid, r, c)
        }
      }
    }
  }
}

const part1 = (steps) => {
  const new_grid = JSON.parse(JSON.stringify(input))
  let flashes = 0
  for (let i = 0; i < steps; i++) {
    input.forEach((row, r_idx) => {
      row.forEach((col, c_idx) => {
        new_grid[r_idx][c_idx]++

        if (new_grid[r_idx][c_idx] === 10) {
          flash(new_grid, r_idx, c_idx)
        }
      })
    })

    input.forEach((row, r_idx) => {
      row.forEach((col, c_idx) => {
        if (new_grid[r_idx][c_idx] > 9) {
          new_grid[r_idx][c_idx] = 0
          flashes++
        }
      })
    })
  }
  return flashes
}

const part2 = () => {
  const new_grid = JSON.parse(JSON.stringify(input))
  let steps = 0
  let all_flashed = false
  while (!all_flashed) {
    steps++
    let flashes = 0
    input.forEach((row, r_idx) => {
      row.forEach((col, c_idx) => {
        new_grid[r_idx][c_idx]++

        if (new_grid[r_idx][c_idx] === 10) {
          flash(new_grid, r_idx, c_idx)
        }
      })
    })

    input.forEach((row, r_idx) => {
      row.forEach((col, c_idx) => {
        if (new_grid[r_idx][c_idx] > 9) {
          new_grid[r_idx][c_idx] = 0
          flashes++
        }
      })
    })
    all_flashed = (flashes === 100)
  }
  return steps
}

console.log('Part 1:', part1(100)) // Part 1: 1562
console.log('Part 2:', part2())    // Part 2: 268
