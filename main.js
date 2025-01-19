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

// Based on a knight's moves on a chess board
function findNeighbors([row, col], array) {

}

function upperNeighbors([row, col], array) {
  array.push([row + 1, col - 2]);
  array.push([row + 2, col - 1]);
  array.push([row + 2, col + 1]);
  array.push([row + 1, col + 2]);
  return array;
}

function lowerNeighbors([row, col], array) {
  array.push([row - 1, col + 2]);
  array.push([row - 2, col + 1]);
  array.push([row - 2, col - 1]);
  array.push([row - 1, col - 2]);
  return array;
}

function leftVertexNeighbors([row, col], array) {
  array.push([row - 2, col + 1]);
  array.push([row - 1, col + 2]);
  array.push([row + 1, col + 2]);
  array.push([row + 2, col + 1]);
  return array;
}

function rightVertexNeighbors([row, col], array) {
  array.push([row - 2, col - 1]);
  array.push([row - 1, col - 2]);
  array.push([row + 1, col - 2]);
  array.push([row + 2, col - 1]);
  return array;
}

function borderVertices([row, col], array) {
  if (row === 0 && col === 0) {
    array.push([row + 2, col + 1]);
    array.push([row + 1, col + 2]);
    return array;
  }

  if (row === 0 && col === 7) {
    array.push([row + 2, col - 1]);
    array.push([row + 1, col - 2]);
    return array;
  }

  if (row === 7 && col === 0) {
    array.push([row - 2, col + 1]);
    array.push([row - 1, col + 2]);
    return array;
  }

  if (row === 7 && col === 7) {
    array.push([row - 2, col - 1]);
    array.push([row - 1, col - 2]);
    return array;
  }

  if (row === 1 && col === 0) {
    array.push([row - 1, col + 2]);
    array.push([row + 2, col + 1]);
    array.push([row + 1, col + 2]);
    return array;
  }

  if (row === 6 && col === 0) {
    array.push([row + 1, col + 2]);
    array.push([row - 1, col + 2]);
    array.push([row - 2, col + 1]);
    return array;
  }

  if (row === 7 && col === 1) {
    array.push([row - 1, col + 2]);
    array.push([row - 2, col + 1]);
    array.push([row - 2, col - 1]);
    return array;
  }

  if (row === 7 && col === 6) {
    array.push([row - 1, col - 2]);
    array.push([row - 2, col - 1]);
    array.push([row - 2, col + 1]);
    return array;
  }

  if (row === 1 && col === 0) {
    array.push([row - 1, col + 2]);
    array.push([row + 2, col + 1]);
    array.push([row + 1, col + 2]);
    return array;
  }

  if (row === 6 && col === 0) {
    array.push([row + 1, col + 2]);
    array.push([row + 2, col - 1]);
    array.push([row - 2, col + 1]);
    return array;
  }

  if (row === 1 && col === 7) {
    array.push([row + 2, col - 1]);
    array.push([row + 1, col - 2]);
    array.push([row - 1, col - 2]);
    return array;
  }

  if (row === 6 && col === 7) {
    array.push([row + 1, col - 2]);
    array.push([row - 1, col - 2]);
    array.push([row - 2, col - 1]);
    return array;
  }

  if (row === 0 && col === 1) {
    array.push([row + 2, col - 1]);
    array.push([row + 2, col + 1]);
    array.push([row + 1, col + 2]);
    return array;
  }

  if (row === 0 && col === 6) {
    array.push([row + 2, col + 1]);
    array.push([row + 2, col - 1]);
    array.push([row + 1, col - 2]);
    return array;
  }

  if (col > 1 && col < 6 && row === 0) {
    return upperNeighbors([row, col], []);
  }

  if (col > 1 && col < 6 && row === 7) {
    return lowerNeighbors([row, col], []);
  }

  if (row > 1 && row < 6 && col === 0) {
    return leftVertexNeighbors([row, col], []);
  }

  if (row > 1 && row < 6 && col === 7) {
    return rightVertexNeighbors([row, col], []);
  }
}

function removeInvalid(coordinates, array) {
  const [row, col] = coordinates;
  if (row < 0 || row > 7 || col < 0 || col > 7) {
    array.pop();
  }
  return array;
}

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

console.log(knightMoves([4, 0]));
