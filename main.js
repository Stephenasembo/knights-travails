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

function Node(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
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

class ShortestPathBFS {
  static bfs(graph, source, parent, distance) {
    const queue = [];
    distance[source] = 0;
    queue.push(source);
    while (queue.length > 0) {
      const node = queue.shift();
      const neighborsArr = graph[node][0];
      for (let i = 0; i < neighborsArr.length; i += 1) {
        const neighborIndex = getIndex(neighborsArr[i]);
        if (distance[neighborIndex] === 'Infinity') {
          parent[neighborIndex] = node;
          distance[neighborIndex] = distance[node] + 1;
          queue.push(neighborIndex);
        }
      }
    }
  }

  static printShortestDistance(graph, source, destination, vertex) {
    // Contain parent of vertex
    const parent = Array(vertex).fill(-1);

    // Contains distance of vertex from source
    const distance = Array(vertex).fill('Infinity');

    ShortestPathBFS.bfs(graph, source, parent, distance);
    if (distance[destination] === 'Infinity') {
      return null;
    }

    const path = [];
    let currentNode = destination;
    path.push(destination);
    while (parent[currentNode] !== -1) {
      path.push(parent[currentNode]);
      currentNode = parent[currentNode];
    }

    const pathReverse = path.reverse();
    for (let i = 0; i < pathReverse.length; i += 1) {
      pathReverse[i] = getCoordinates(pathReverse[i]);
    }
    const pathString = pathReverse.join(' -> ');
    console.log(pathString);
    return pathString;
  }

  static main() {
    const vertex = 64;
    const source = 0;
    const destination = 63;

    const graph = createAdjacencyList();

    ShortestPathBFS.printShortestDistance(graph, source, destination, vertex);
  }
}

ShortestPathBFS.main();
