import React, { Component } from 'react';
import Node from './Node';

export default class NetwalkUI extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const nodes = this.props.board;

    return <div className="netwalk">{nodes.map((node) => {
      return <Node key={`node${node.id}`}
                   id={node.id}
                   type={node.type}
                   direction={node.direction}
                   connected={node.connected}
                   onRotate={this.props.onRotate} />;
    })}</div>;
  }
}
