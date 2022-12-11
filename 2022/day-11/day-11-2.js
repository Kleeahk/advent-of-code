const fs = require('fs')
const input = fs.readFileSync('./sample.txt', 'utf8').split('\n\n')

const monkeys = input.reduce((acc, chunk, idx) => {
  acc[idx] = { items: [], operation: [], test: null, ifTrue: null, ifFalse: null }

  const lines = chunk.split('\n')
  acc[idx]['items'] = lines[1].split(': ')[1].split(', ').map(item => parseInt(item))
  acc[idx]['operation'] = lines[2].split('= ')[1]
  acc[idx]['test'] = parseInt(lines[3].split('by ')[1])
  acc[idx]['ifTrue'] = parseInt(lines[4].split('monkey ')[1])
  acc[idx]['ifFalse'] = parseInt(lines[5].split('monkey ')[1])
  acc[idx]['inspected'] = 0

  return acc
}, [])

const part2 = () => {
  const modder = monkeys.reduce((acc, monkey) => {
    return acc * monkey.test
  }, 1)
  
  for (let i = 0; i < 10000; i++) {
    monkeys.forEach(monkey => {
      const tempItems = [...monkey.items]
      tempItems.forEach(item => {
        let operation = monkey.operation.replace(/old/g, item % modder)
        const newWorry = Math.floor(eval(operation))
        if ((newWorry % monkey.test) === 0) {
          monkeys[monkey.ifTrue].items.push(newWorry)
        } else {
          monkeys[monkey.ifFalse].items.push(newWorry)
        }
        monkey.items.shift()
        monkey.inspected++
      })
    })
  }

  monkeys.sort((a, b) => b.inspected - a.inspected)
  return monkeys[0].inspected * monkeys[1].inspected
}

console.log('Part 2:', part2())
