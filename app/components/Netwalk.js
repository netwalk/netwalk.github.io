import 'array.prototype.findindex';
import uuid from 'node-uuid';
import { vector as Vector } from 'vektor';

export default class Netwalk {
  constructor() {
    this.board = [];
    this.totalColumns = 0;
    this.totalRows = 0;
  }

  getCurrentBoard() {
    return this.board;
  }

  registerGeneratorCallback(callback) {
    this.generatorCallback = callback;
  }

  generateBoard(rows, columns) {
    const callback = this.generatorCallback;
    let board;

    this.totalColumns = columns;
    this.totalRows = rows;
    
    board = [
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
      },
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
      },
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
    ];

    board = this.getRecalculatedBoard(board);

    if (typeof callback === 'function') {
      callback(board);
    }

    this.board = board;

    return board;
  }

  turnNode(id) {
    let nodes = this.getCurrentBoard();
    const nodeIndex = this.findNode(id);

    if (nodeIndex < 0) {
      return;
    }

    const node = nodes[nodeIndex];
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

    nodes[nodeIndex].direction = new_direction;
    nodes[nodeIndex].connections = new_connections;

    nodes = this.getRecalculatedBoard(nodes);

    this.setBoardTo(nodes);
  }

  getRecalculatedBoard(nodes) {
    const server = this.getServerNode(nodes);

    const connectedNodes = this.getConnectedNeighborsOf(server, null, nodes);

    for (let index in nodes) {
      let node = nodes[index];
      if (node.type === 'server' || connectedNodes.findIndex((n) => n.id === node.id) >= 0) {
        nodes[index].connected = true;
      } else {
        nodes[index].connected = false;
      }
    }

    return nodes;
  }

  getConnectedNeighborsOf(node, exceptDirection, board) {
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

      let neighbor = this.findNodeByVector(node.vector.add(direction.vector), board);
      if (!neighbor) {
        continue;
      }
      if (this.nodesAreConnected(node, neighbor, board)) {
        connectedNodes.push(neighbor);
        // console.log("going to call getConnected on " + neighbor.type + " on " + neighbor.vector.x + "," + neighbor.vector.y + " with " + this.getOppositeDirectionOf(direction.name) + " from " + node.type + " on " + node.vector.x + "," + node.vector.y);
      // if (node.vector.x === 0 && node.vector.y === 1) {
      //   continue;
      // }
        let nodes = this.getConnectedNeighborsOf(neighbor, this.getOppositeDirectionOf(direction.name), board);
        for (let key in nodes) {
          connectedNodes.push(nodes[key]);
        }
      }
    }

    return connectedNodes;
  }

  nodesAreConnected(node1, node2, board) {
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

  inBounds(vector) {
    const x = vector.x;
    const y = vector.y;
    return x >= 0 && y >= 0 && x < this.totalColumns && y < this.totalRows;
  }

  setBoardTo(board) {
    this.board = board;
  }

  getServerNode(nodes) {
    const nodeIndex = nodes.findIndex((node) => node.type === 'server');

    if (nodeIndex < 0) {
      console.warn('Failed to find server node', nodes);
    }

    return nodes[nodeIndex];
  }

  findNode(id) {
    const nodes = this.getCurrentBoard();
    const nodeIndex = nodes.findIndex((node) => node.id === id);

    if (nodeIndex < 0) {
      console.warn('Failed to find node', nodes, id);
    }

    return nodeIndex;
  }

  findNodeByVector(vector, nodes) {
    if (!this.inBounds(vector)) {
      return null;
    }

    const nodeIndex = vector.x + vector.y * this.totalColumns;

    if (!nodes[nodeIndex]) {
      return null;
    }

    return nodes[nodeIndex];
  }
}
