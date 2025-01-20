// Rejects access outside the board
function removeInvalid(coordinates, array) {
  const [row, col] = coordinates;
  if (row < 0 || row > 7 || col < 0 || col > 7) {
    array.pop();
  }
  return array;
}

// Gets all possible paths of a knight at a particular square
function possibleMoves([row, col]) {
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
      const neighbors = possibleMoves([row, col]);
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

// Looks for the shortest path
class ShortestPathBFS {
  static bfs(graph, source, parent, distance) {
    const dist = distance;
    const par = parent;
    const queue = [];
    dist[source] = 0;
    queue.push(source);
    while (queue.length > 0) {
      const node = queue.shift();
      const neighborsArr = graph[node][0];
      for (let i = 0; i < neighborsArr.length; i += 1) {
        const neighborIndex = getIndex(neighborsArr[i]);
        if (distance[neighborIndex] === 'Infinity') {
          par[neighborIndex] = node;
          dist[neighborIndex] = distance[node] + 1;
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
      pathReverse[i] = `(${pathReverse[i]})`;
    }
    const moves = pathReverse.length - 1;
    console.log(`You made it in ${moves} moves! Here's your path: `);
    const pathString = pathReverse.join(' -> ');
    console.log(pathString);
    return pathString;
  }

  static main(start, end) {
    const vertex = 64;
    const source = getIndex(start);
    const destination = getIndex(end);

    const graph = createAdjacencyList();

    ShortestPathBFS.printShortestDistance(graph, source, destination, vertex);
  }
}

function knightMoves(start, end) {
  ShortestPathBFS.main(start, end);
}

knightMoves([8, 3], [4, 3]);
