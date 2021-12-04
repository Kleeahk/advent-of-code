const fs = require('fs')

const input = fs.readFileSync('./input-1.txt', 'utf8').split('\n\n')
const numbers = input.shift().split(',').map(num => parseInt(num))
const horizontal_boards = input.map(board =>
  board.split('\n').map(line =>
    line.split(' ').filter(num => num !== '').map(num => parseInt(num))
  )
)

// Guess who didn't read the instructions? (ノಠ益ಠ)ノ彡┻━┻
// const getDiagonals = (board) => {
//   const diagonals = [[],[]]
//   for (let i = 0; i < board.length; i++) {
//     diagonals[0].push(board[i][0+i])
//     diagonals[1].push(board[i][board.length-(i+1)])
//   }
//   return diagonals
// }

const getVerticals = (board) => {
  const verticals = Array.from(Array(board.length), () => [])

  board.forEach(line =>
    line.forEach((num, idx) =>
      verticals[idx].push(num)
    )
  )
  return verticals
}

const boards = horizontal_boards.reduce((acc, hboard) => {
  acc.push({
    horizontals: hboard,
    verticals: getVerticals(hboard) 
  })
  return acc
}, [])

const doesLineWin = (line, numbers_called) =>
  line.find(row => row.every(elem => numbers_called.includes(elem)))

const doesBoardWin = (board, numbers_called) =>
  doesLineWin(board.horizontals, numbers_called) || doesLineWin(board.verticals, numbers_called)

const sumUncalled = (board, numbers_called) => 
  board.horizontals.reduce((acc, row) => {
    row.filter(num => !numbers_called.includes(num)).forEach(num => acc += num)
    return acc
  }, 0)

const part1 = () => {
  const numbers_called = numbers.slice(0, 4)
  for (let i = 4; i < numbers.length; i++) {
    numbers_called.push(numbers[i])

    for (let b = 0; b < boards.length; b++) {
      if (doesBoardWin(boards[b], numbers_called)) {
        const winning_number = numbers[i]
        const sum_uncalled = sumUncalled(boards[b], numbers_called)
        return winning_number * sum_uncalled
      }
    }
  }
}

const part2 = () => {
  const numbers_called = numbers.slice(0, 4)
  const losing_boards = [...boards]

  for (let i = 4; i < numbers.length; i++) {
    numbers_called.push(numbers[i])

    for (let b = 0; b < losing_boards.length; b++) {
      if (doesBoardWin(losing_boards[b], numbers_called)) {
        if (losing_boards.length === 1) {
          const winning_number = numbers[i]
          const sum_uncalled = sumUncalled(losing_boards[0], numbers_called)
          return winning_number * sum_uncalled
        }
        losing_boards.splice(b, 1)
      }
    }
  }
}

console.log("part 1:", part1()) // part 1: 14093
console.log("part 2:", part2()) // part 2: 17388
