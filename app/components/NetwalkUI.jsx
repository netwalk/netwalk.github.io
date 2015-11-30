import './netwalk.css';

import React, { Component } from 'react';
import Node from './Node';

export default class NetwalkUI extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="netwalk">{this.renderNodes()}</div>;
  }

  renderNodes() {
    return this.props.matrix.map((node) => {
      return <Node key={`node${node.id}`}
                   id={node.id}
                   type={node.type}
                   direction={node.direction}
                   connected={node.connected}
                   onRotate={this.props.onRotate} />;
    });
  }

}
