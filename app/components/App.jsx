import uuid from 'node-uuid';
import React, { Component } from 'react';
import Nodes from './Nodes.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [
        {
          id: uuid.v4(),
          type: 'elbow',
          direction: 'rightdown',
          connected: true
        },
        {
          id: uuid.v4(),
          type: 'tee',
          direction: 'down',
          connected: true
        },
        {
          id: uuid.v4(),
          type: 'elbow',
          direction: 'downleft',
          connected: true
        },
        {
          id: uuid.v4(),
          type: 'line',
          direction: 'vertical',
          connected: true
        },
        {
          id: uuid.v4(),
          type: 'line',
          direction: 'vertical',
          connected: true
        },
        {
          id: uuid.v4(),
          type: 'line',
          direction: 'vertical',
          connected: true
        },
        {
          id: uuid.v4(),
          type: 'server',
          direction: 'up'
        },
        {
          id: uuid.v4(),
          type: 'computer',
          direction: 'up',
          connected: true
        },
        {
          id: uuid.v4(),
          type: 'computer',
          direction: 'up',
          connected: true
        }
      ]
    }

    this.findNode = this.findNode.bind(this);
    this.addNode = this.addNode.bind(this);
    this.turnNode = this.turnNode.bind(this);
  }

  render() {
    const nodes = this.state.nodes;

    return (
      <div className="netwalk">
        <Nodes items={nodes} onTurn={this.turnNode} />
      </div>
    );
  }

  addNode() {
    this.setState({
      nodes: this.state.nodes.concat([{
        id: uuid.v4(),
        type: 'elbow',
        direction: 'rightdown'
      }])
    });
  }

  turnNode(id) {
    let nodes = this.state.nodes;
    const nodeIndex = this.findNode(id);

    if (nodeIndex < 0) {
      return;
    }

    const current_direction = nodes[nodeIndex].direction;
    let new_direction = '';

    switch (current_direction) {
      // Elbows
      case 'upright':
        new_direction = 'rightdown';
        break;
      case 'rightdown':
        new_direction = 'downleft';
        break;
      case 'downleft':
        new_direction = 'leftup';
        break;
      case 'leftup':
        new_direction = 'upright';
        break;

      // Tees, computers and server
      case 'up':
        new_direction = 'right';
        break;
      case 'right':
        new_direction = 'down';
        break;
      case 'down':
        new_direction = 'left';
        break;
      case 'left':
        new_direction = 'up';
        break;

      // Lines
      case 'horizontal':
        new_direction = 'vertical';
        break;
      case 'vertical':
        new_direction = 'horizontal';
        break;
    }

    nodes[nodeIndex].direction = new_direction;

    this.setState(nodes);
  }

  findNode(id) {
    const nodes = this.state.nodes;
    const nodeIndex = nodes.findIndex((node) => node.id === id);

    if (nodeIndex < 0) {
      console.warn('Failed to find node', nodes, id);
    }

    return nodeIndex;
  }
}
