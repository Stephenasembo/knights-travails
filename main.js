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

function getCoordinates(index) {
  const row = Math.floor(index / 8);
  const col = index % 8;
  return [row, col];
}

const list = createAdjacencyList();
console.log(getCoordinates(60));
