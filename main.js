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
