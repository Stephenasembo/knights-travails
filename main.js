function createBoard() {
  const array = [];
  // Our board is 8 * 8
  const size = 8;
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      const col = [i, j];
      array.push(col);
    }
  }
  return array;
}

function invalidAccess([row, col]) {
  if (row < 0 || row > 7 || col < 0 || col > 7) {
    throw new Error('Trying to access area out of board');
  }
}

// Rejects access outside the board
function removeInvalid(coordinates, array) {
  const [row, col] = coordinates;
  if (row < 0 || row > 7 || col < 0 || col > 7) {
    array.pop();
  }
  return array;
}

// Gets all possible paths of a knight at a particular square
function knightMoves([row, col]) {
  let array = [];
  array.push([row - 2, col - 1]);
  let newCoordinates = array[array.length - 1];
  array = removeInvalid(newCoordinates, array);

  array.push([row - 1, col - 2]);
  newCoordinates = array[array.length - 1];
  array = removeInvalid(newCoordinates, array);

  array.push([row + 1, col - 2]);
  newCoordinates = array[array.length - 1];
  array = removeInvalid(newCoordinates, array);

  array.push([row + 2, col - 1]);
  newCoordinates = array[array.length - 1];
  array = removeInvalid(newCoordinates, array);

  array.push([row + 2, col + 1]);
  newCoordinates = array[array.length - 1];
  array = removeInvalid(newCoordinates, array);

  array.push([row + 1, col + 2]);
  newCoordinates = array[array.length - 1];
  array = removeInvalid(newCoordinates, array);

  array.push([row - 1, col + 2]);
  newCoordinates = array[array.length - 1];
  array = removeInvalid(newCoordinates, array);

  array.push([row - 2, col + 1]);
  newCoordinates = array[array.length - 1];
  array = removeInvalid(newCoordinates, array);

  return array;
}

function createAdjacencyList() {
  const adjacencyList = [];
  // Each square on the board is a vertex for our graph
  // Each vertex contains a list of its adjacent vertices
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const vertexNeighbors = [];
      const neighbors = knightMoves([row, col]);
      vertexNeighbors.push(neighbors);
      adjacencyList.push(vertexNeighbors);
    }
  }
  return adjacencyList;
}

const adjacencyList = createAdjacencyList();

function getCoordinates(index) {
  if (index < 0 || index > 63) {
    throw new Error('Trying to access area out of board');
  }
  const row = Math.floor(index / 8);
  const col = index % 8;
  return [row, col];
}

function getIndex(array) {
  const [row, col] = array;
  if (row > 7 || row < 0 || col < 0 || col > 7) {
    throw new Error('Trying to access area out of bounds');
  }
  return row * 8 + col;
}

function findPath(start, end) {
  const startIndex = getIndex(start);
  const endIndex = getIndex(end);
}

function Node(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function merge(left, right, array = []) {
  const length = left.length + right.length;
  for (let i = 0; i < length; i += 1) {
    if (left[0] < right[0] || left[0] === right[0]) {
      array[i] = left.shift();
    } else if (right[0] < left[0]) {
      array[i] = right.shift();
    }
    if (left.length === 0) {
      array.push(...right);
      break;
    }
    if (right.length === 0) {
      array.push(...left);
      break;
    }
  }
  return array;
}
// Sort the array first
function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  const leftHalf = array.slice(0, mid);
  const rightHalf = array.slice(mid, array.length);
  const sortedLeft = mergeSort(leftHalf);
  const sortedRight = mergeSort(rightHalf);
  return merge(sortedLeft, sortedRight);
}

function buildTree(array, start, end) {
  if (start > end) return null;
  const mid = start + Math.floor((end - start) / 2);
  const root = Node(array[mid]);
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);
  return root;
}
// Create a binary search tree
class Tree {
  constructor(array) {
    this.array = [];
    this.queue = [];
    this.root = buildTree(array, 0, array.length - 1);
  }
}

// Prints the tree in the console
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const testArr = [2, 3, 4, 5];

const testTree = new Tree(testArr);
prettyPrint(testTree.root);
