import React, { Component } from 'react';
import Nodes from './Nodes.jsx';
import Netwalk from './Netwalk';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.Netwalk = new Netwalk;

    this.Netwalk.registerGeneratorCallback((function(board) {
      this.state = {
        nodes: board
      }
    }).bind(this));

    this.Netwalk.generateBoard(props.rows, props.columns);

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

  turnNode(id) {
    this.Netwalk.turnNode(id);
    this.setState({
      nodes: this.Netwalk.getCurrentBoard()
    });
  }
}
