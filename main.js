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

function invalidAccess([x, y]) {
  if (x < 0 || x > 7 || y < 0 || y > 7) {
    throw new Error('Trying to access area out of board');
  }
}

// Based on a knight's moves on a chess board
function findNeighbors([x, y], array) {

}

const board = createBoard();
console.log(board);

function upperNeighbors([x, y], array) {
  array.push([x - 2, y + 1]);
  array.push([x + 2, y + 1]);
  array.push([x - 1, y + 2]);
  array.push([x + 1, y + 2]);
  return array;
}

function lowerNeighbors([x, y], array) {
  array.push([x - 2, y - 1]);
  array.push([x + 2, y - 1]);
  array.push([x - 1, y - 2]);
  array.push([x + 1, y - 2]);
  return array;
}

function leftVertexNeighbors([x, y], array) {
  array.push([x - 2, y + 1]);
  array.push([x - 1, y + 2]);
  array.push([x + 1, y + 2]);
  array.push([x + 2, y + 1]);
  return array;
}

function rightVertexNeighbors([x, y], array) {
  array.push([x - 2, y - 1]);
  array.push([x - 1, y - 2]);
  array.push([x + 1, y - 2]);
  array.push([x + 2, y - 1]);
  return array;
}

function borderVertices([x, y], array) {
  if (x === 0 && y === 0) {
    array.push([x + 2, y + 1]);
    array.push([x + 1, y + 2]);
    return array;
  }

  if (x === 0 && y === 7) {
    array.push([x - 2, y + 1]);
    array.push([x - 1, y + 2]);
    return array;
  }

  if (x === 7 && y === 0) {
    array.push([x + 2, y - 1]);
    array.push([x + 1, y - 2]);
    return array;
  }

  if (x === 7 && y === 7) {
    array.push([x - 2, y - 1]);
    array.push([x - 1, y - 2]);
    return array;
  }

  if (x === 1 && y === 0) {
    array.push([x - 1, y + 2]);
    array.push([x + 2, y + 1]);
    array.push([x + 1, y + 2]);
    return array;
  }

  if (x === 6 && y === 0) {
    array.push([x + 1, y + 2]);
    array.push([x - 1, y + 2]);
    array.push([x - 2, y + 1]);
    return array;
  }

  if (x === 7 && y === 1) {
    array.push([x - 1, y + 2]);
    array.push([x - 2, y + 1]);
    array.push([x - 2, y - 1]);
    return array;
  }

  if (x === 7 && y === 6) {
    array.push([x - 1, y - 2]);
    array.push([x - 2, y - 1]);
    array.push([x - 2, y + 1]);
    return array;
  }

  if (x === 1 && y === 0) {
    array.push([x - 1, y + 2]);
    array.push([x + 2, y + 1]);
    array.push([x + 1, y + 2]);
    return array;
  }

  if (x === 6 && y === 0) {
    array.push([x + 1, y + 2]);
    array.push([x + 2, y - 1]);
    array.push([x - 2, y + 1]);
    return array;
  }

  if (x === 1 && y === 7) {
    array.push([x + 2, y - 1]);
    array.push([x + 1, y - 2]);
    array.push([x - 1, y - 2]);
    return array;
  }

  if (x === 6 && y === 7) {
    array.push([x + 1, y - 2]);
    array.push([x - 1, y - 2]);
    array.push([x - 2, y - 1]);
    return array;
  }

  if (y > 1 && y < 6 && x === 0) {
    return upperNeighbors();
  }

  if (y > 1 && y < 6 && x === 7) {
    return lowerNeighbors();
  }

  if (x > 1 && x < 6 && y === 0) {
    return leftVertexNeighbors();
  }

  if (x > 1 && x < 6 && y === 7) {
    return rightVertexNeighbors();
  }
}
