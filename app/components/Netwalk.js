import 'array.prototype.findindex';
import uuid from 'node-uuid';
import { vector as Vector } from 'vektor';

export default class Netwalk {

  constructor() {
    this.matrix = [];
  }

  getCurrentMatrix() {
    return this.matrix;
  }

  registerGeneratorCallback(callback) {
    this.generatorCallback = callback;
  }

  generateMatrix(rows, columns) {
    const callback = this.generatorCallback;
    let matrix;
    
    matrix = [
      [
        {
          id: uuid.v4(),
          type: 'elbow',
          direction: 'downleft',
          connections: ['down', 'left'],
          connected: true,
          vector: new Vector(0, 0)
        },
        {
          id: uuid.v4(),
          type: 'tee',
          direction: 'leftupright',
          connections: ['left', 'up', 'right'],
          connected: true,
          vector: new Vector(1, 0)
        },
        {
          id: uuid.v4(),
          type: 'elbow',
          direction: 'upright',
          connections: ['up', 'right'],
          connected: true,
          vector: new Vector(2, 0)
        }
      ],
      [
        {
          id: uuid.v4(),
          type: 'line',
          direction: 'leftright',
          connections: ['left', 'right'],
          connected: true,
          vector: new Vector(0, 1)
        },
        {
          id: uuid.v4(),
          type: 'line',
          direction: 'updown',
          connections: ['up', 'down'],
          connected: true,
          vector: new Vector(1, 1)
        },
        {
          id: uuid.v4(),
          type: 'line',
          direction: 'leftright',
          connections: ['left', 'right'],
          connected: true,
          vector: new Vector(2, 1)
        }
      ],
      [
        {
          id: uuid.v4(),
          type: 'server',
          direction: 'right',
          connections: ['right'],
          vector: new Vector(0, 2)
        },
        {
          id: uuid.v4(),
          type: 'computer',
          direction: 'down',
          connections: ['down'],
          connected: true,
          vector: new Vector(1, 2)
        },
        {
          id: uuid.v4(),
          type: 'computer',
          direction: 'up',
          connections: ['up'],
          connected: true,
          vector: new Vector(2, 2)
        }
      ]
    ];

    matrix = this.getRecalculatedMatrix(matrix);

    if (typeof callback === 'function') {
      callback(matrix);
    }

    this.matrix = matrix;

    return matrix;
  }

  rotateNode(id) {
    let matrix = this.getCurrentMatrix();
    const node = this.findNodeById(id);

    if (!node) {
      return;
    }

    const current_direction = node.direction;
    let new_direction = '';
    let new_connections = [];

    switch (current_direction) {
      // Elbows
      case 'upright':
        new_direction = 'rightdown';
        new_connections = ['right', 'down'];
        break;
      case 'rightdown':
        new_direction = 'downleft';
        new_connections = ['down', 'left'];
        break;
      case 'downleft':
        new_direction = 'leftup';
        new_connections = ['left', 'up'];
        break;
      case 'leftup':
        new_direction = 'upright';
        new_connections = ['up', 'right'];
        break;

      // Tees
      case 'leftupright':
        new_direction = 'uprightdown';
        new_connections = ['up', 'right', 'down'];
        break;
      case 'uprightdown':
        new_direction = 'rightdownleft';
        new_connections = ['right', 'down', 'left'];
        break;
      case 'rightdownleft':
        new_direction = 'downleftup';
        new_connections = ['down', 'left', 'up'];
        break;
      case 'downleftup':
        new_direction = 'leftupright';
        new_connections = ['left', 'up', 'right'];
        break;

      // Computers and server
      case 'up':
        new_direction = 'right';
        new_connections = ['right'];
        break;
      case 'right':
        new_direction = 'down';
        new_connections = ['down'];
        break;
      case 'down':
        new_direction = 'left';
        new_connections = ['left'];
        break;
      case 'left':
        new_direction = 'up';
        new_connections = ['up'];
        break;

      // Lines
      case 'leftright':
        new_direction = 'updown';
        new_connections = ['up', 'down'];
        break;
      case 'updown':
        new_direction = 'leftright';
        new_connections = ['left', 'right'];
        break;
    }

    matrix[node.vector.y][node.vector.x].direction = new_direction;
    matrix[node.vector.y][node.vector.x].connections = new_connections;

    matrix = this.getRecalculatedMatrix(matrix);

    this.setMatrixTo(matrix);
  }

  getRecalculatedMatrix(matrix) {
    const server = this.getServerNode(matrix);

    const connectedNodes = this.getConnectedNeighborsOf(server, null, matrix);

    for (let x in matrix) {
      for (let y in matrix[x]) {
        let node = matrix[x][y];
        if (node.type === 'server' || connectedNodes.findIndex((n) => n.id === node.id) >= 0) {
          matrix[x][y].connected = true;
        } else {
          matrix[x][y].connected = false;
        }
      }
    }

    return matrix;
  }

  getConnectedNeighborsOf(node, exceptDirection, matrix) {
    let connectedNodes = [];

    if (node.type === 'computer') {
      return;
    }

    let directions = [
      { name: 'up', vector: new Vector(0, -1) },
      { name: 'down', vector: new Vector(0, 1) },
      { name: 'left', vector: new Vector(-1, 0) },
      { name: 'right', vector: new Vector(1, 0) }
    ];

    for (let index in directions) {
      let direction = directions[index];

      if (exceptDirection === direction.name) {
        continue;
      }

      let neighbor = this.findNodeByVector(node.vector.add(direction.vector), matrix);
      if (!neighbor) {
        continue;
      }
      if (this.nodesAreConnected(node, neighbor, matrix)) {
        connectedNodes.push(neighbor);
        let nodes = this.getConnectedNeighborsOf(neighbor, this.getOppositeDirectionOf(direction.name), matrix);
        for (let key in nodes) {
          connectedNodes.push(nodes[key]);
        }
      }
    }

    return connectedNodes;
  }

  nodesAreConnected(node1, node2, matrix) {
    let xdiff = Math.abs(node1.vector.x - node2.vector.x);
    let ydiff = Math.abs(node1.vector.y - node2.vector.y);
    if (xdiff > 0 && ydiff > 0) {
      return false;
    }

    let conn1 = node1.connections;
    let conn2 = node2.connections;

    let node1IsOnHigherRow = node1.vector.y < node2.vector.y;
    let node2IsOnHigherRow = node1.vector.y > node2.vector.y;
    let nodesAreOnSameRow = node1.vector.y === node2.vector.y;
    let node1IsOnFartherColumn = node1.vector.x > node2.vector.x;
    let node2IsOnFartherColumn = node1.vector.x < node2.vector.x;
    let nodesAreOnSameColumn = node1.vector.x === node2.vector.x;

    if (conn1.findIndex((c) => c === 'up') >= 0
        && conn2.findIndex((c) => c === 'down') >= 0
        && node2IsOnHigherRow
        && nodesAreOnSameColumn) {
      // console.log("Node " + node1.vector.x + "," + node1.vector.y + " is connected with " + node2.vector.x + "," + node2.vector.y + " because of UP to DOWN connection", node1, node2);
      return true;
    }
    
    if (conn1.findIndex((c) => c === 'down') >= 0
        && conn2.findIndex((c) => c === 'up') >= 0
        && node1IsOnHigherRow
        && nodesAreOnSameColumn) {
      // console.log("Node " + node1.vector.x + "," + node1.vector.y + " is connected with " + node2.vector.x + "," + node2.vector.y + " because of DOWN to UP connection", node1, node2);
      return true;
    }
    if (conn1.findIndex((c) => c === 'left') >= 0
        && conn2.findIndex((c) => c === 'right') >= 0
        && node1IsOnFartherColumn
        && nodesAreOnSameRow) {
      // console.log("Node " + node1.vector.x + "," + node1.vector.y + " is connected with " + node2.vector.x + "," + node2.vector.y + " because of LEFT to RIGHT connection", node1, node2);
      return true;
    }
    if (conn1.findIndex((c) => c === 'right') >= 0
        && conn2.findIndex((c) => c === 'left') >= 0
        && node2IsOnFartherColumn
        && nodesAreOnSameRow) {
      // console.log("Node " + node1.vector.x + "," + node1.vector.y + " is connected with " + node2.vector.x + "," + node2.vector.y + " because of RIGHT to LEFT connection", node1, node2);
      return true;
    }


    return false;
  }

  getOppositeDirectionOf(direction) {
    switch(direction) {
      case 'up':
        return 'down';
        break;
      case 'down':
        return 'up';
        break;
      case 'left':
        return 'right';
        break;
      case 'right':
        return 'left';
        break;
    }
  }

  inBounds(vector, matrix) {
    const totalRows = matrix.length;
    if (totalRows === 0) {
      return false;
    }
    const totalColumns = matrix[0].length;
    const x = vector.x;
    const y = vector.y;
    return x >= 0 && y >= 0 && x < totalColumns && y < totalRows;
  }

  setMatrixTo(matrix) {
    this.matrix = matrix;
  }

  getServerNode(matrix) {

    for (let x in matrix) {
      for (let y in matrix[x]) {
        let node = matrix[x][y];
        if (node.type === 'server') {
          return node;
        }
      }
    }

    console.warn('Failed to find server node', matrix);
  }

  findNodeById(id) {
    const matrix = this.getCurrentMatrix();

    for (let x in matrix) {
      for (let y in matrix[x]) {
        let node = matrix[x][y];
        if (node.id === id) {
          return node;
        }
      }
    }

    console.warn('Failed to find node', matrix, id);
  }

  findNodeByVector(vector, matrix) {
    if (!this.inBounds(vector, matrix)) {
      return null;
    }

    if (!matrix[vector.y] && !matrix[vector.y][vector.x]) {
      return null;
    }

    return matrix[vector.y][vector.x];
  }

}
