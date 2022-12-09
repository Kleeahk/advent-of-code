const fs = require('fs')
const input = fs.readFileSync('./input2.txt', 'utf8').split('\n')

function Node(value, isADir) {

  this.value = value
  this.size = 0
  this.isADir = isADir
  this.children = []
  this.parent = null

  this.getValue = () => this.value
  this.isDir = () => this.isADir

  this.setParentNode = (node) => this.parent = node
  this.getParentNode = () => this.parent

  this.addChild = (node) => {
    node.setParentNode(this)
    this.children[this.children.length] = node
    return node
  }
  this.getChildren = () => this.children
  this.hasChild = (value) => {
    const childMatch = this.children.filter(child => child.value === value)
    return childMatch.length > 0 ? childMatch[0] : false
  }

  this.addSize = (size) => {
    this.size += size
    if (this.parent) this.parent.addSize(size)
  }
  this.getSize = () => this.size
}

const buildFilesystem = () => {
  const root = new Node('/', true)
  let current = root

  input.forEach(line => {
    const command = line.split(' ')
    
    if (command[0] === '$') {
      if (command[1] === 'cd') {
        if (command[2] === '..') {
          const parent = current.getParentNode()
          current = parent
        } else {
          if (command[2] === '/') {
            current = root
          } else {
            const dirNode = current.hasChild(command[2])
            current = dirNode
          }
        }
      }
    } else if (command[0] === 'dir') {
      const dirNode = current.hasChild(command[1])
      if (!dirNode) {
        current.addChild(new Node(command[1], true))
      }
    } else {
      const fileNode = current.hasChild(`${command[1]} ${command[0]}`)
      if (!fileNode) {
        const fileNode = new Node (command[1], false)
        fileNode.addSize(parseInt(command[0]))
        current.addChild(fileNode)
        current.addSize(parseInt(command[0]))
      }
    }
  })

  return root
}

const getSizes1 = (node) => {
  let newTotal = 0
  
  node.getChildren().filter(child => child.isDir()).forEach(child => {
    newTotal += getSizes1(child)
  })

  return node.getSize() <= 100000 ? newTotal + node.getSize() : newTotal + 0
}

const part1 = () => {
  const root = buildFilesystem()
  return getSizes1(root)
}

const getSizes2 = (node) => {
  const sizes = []

  node.getChildren().filter(child => child.isDir()).forEach(child => {
    sizes.push(...getSizes2(child))
  })

  sizes.push(node.getSize())
  return sizes
}

const part2 = () => {
  const root = buildFilesystem()
  const spaceNeeded = 30000000 - (70000000 - root.getSize())
  return getSizes2(root).filter(size => size >= spaceNeeded).sort((a, b) => a - b)[0]
}

console.log('Part 1:', part1()) // Part 1: 1432936
console.log('Part 2:', part2()) // Part 2: 272298
