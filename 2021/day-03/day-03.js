const fs = require('fs')
const input = fs.readFileSync('./input-1.txt', 'utf8').split('\n')

const part1 = () => {
  const input_length = input.length
  const input_width = input[0].length
  const num_ones = new Array(input_width).fill(0);

  for (let i = 0; i < input_length; i++) {
    for (let j = 0; j < input_width; j++) {
      if (input[i][j] === '1') { num_ones[j]++ }
    }
  }

  let gamma_rate = ''
  let epsilon_rate =''

  for (let i = 0; i < num_ones.length; i++) {
    if (num_ones[i] >= (input_length/2)) {
      gamma_rate = gamma_rate + '1'
      epsilon_rate = epsilon_rate + '0'
    } else {
      gamma_rate = gamma_rate + '0'
      epsilon_rate = epsilon_rate + '1'
    }
  }

  return parseInt(gamma_rate, 2) * parseInt(epsilon_rate, 2)
}

const find_oxygen_generator_rating = () => {
  const input_width = input[0].length
  let oxygen_input = [...input]

  for (let i = 0; i < input_width; i++) {
    const oxygen_length = oxygen_input.length
    const new_oxygen_ones = []
    const new_oxygen_zeroes = []

    for (let j = 0; j < oxygen_length; j++) {
      if (oxygen_input[j][i] === '1') {
        new_oxygen_ones.push(oxygen_input[j])
      } else {
        new_oxygen_zeroes.push(oxygen_input[j])
      }
    }

    if (new_oxygen_ones.length === new_oxygen_zeroes.length) {
      if (new_oxygen_ones.length === 1) {
        return parseInt(new_oxygen_ones[0], 2)
      } else {
        oxygen_input = new_oxygen_ones
      }
    } else if (new_oxygen_ones.length > new_oxygen_zeroes.length) {
      oxygen_input = new_oxygen_ones
    } else {
      oxygen_input = new_oxygen_zeroes
    }
  }
}

const find_CO2_scrubber_rating = () => {
  const input_width = input[0].length
  let C02_input = [...input]

  for (let i = 0; i < input_width; i++) {
    const C02_length = C02_input.length
    const new_C02_ones = []
    const new_C02_zeroes = []

    for (let j = 0; j < C02_length; j++) {
      if (C02_input[j][i] === '1') {
        new_C02_ones.push(C02_input[j])
      } else {
        new_C02_zeroes.push(C02_input[j])
      }
    }

    if (new_C02_ones.length === new_C02_zeroes.length) {
      if (new_C02_zeroes.length === 1) {
        return parseInt(new_C02_zeroes[0], 2)
      } else {
        C02_input = new_C02_zeroes
      }
    } else if (new_C02_ones.length < new_C02_zeroes.length) {
      C02_input = new_C02_ones
    } else {
      C02_input = new_C02_zeroes
    }
  }
}

const part2 = () => {
  return find_oxygen_generator_rating() * find_CO2_scrubber_rating()
}

console.log("part 1:", part1()) // part 1: 775304
console.log("part 2:", part2()) // part 2: 1370737
