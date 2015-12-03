import './netwalk.scss';

import React, { Component } from 'react';
import Node from './Node';

export default class NetwalkUI extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="NetwalkUI">{this.renderNodes()}</div>;
  }

  renderNodes() {
    return this.props.matrix.map((row) => {
      return <div className="NetwalkUI-row">{row.map((node) => {
        return <Node key={`node${node.id}`}
                     id={node.id}
                     type={node.type}
                     connections={node.connections}
                     connected={node.connected}
                     onRotate={this.props.onRotate} />;
      })}</div>;
    });
  }

}
