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

const board = createBoard();
console.log(board);
invalidAccess([-1, 0]);
