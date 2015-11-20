import React, { Component } from 'react';
import Node from './Node.jsx';

export default class Nodes extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const nodes = this.props.items;

    return <div>{nodes.map((node) => {
      return (
        <Node key={`node${node.id}`} type={node.type} onTurn={this.props.onTurn.bind(null, node.id)} direction={node.direction} connected={node.connected} />
      );
    })}</div>;
  }
}
