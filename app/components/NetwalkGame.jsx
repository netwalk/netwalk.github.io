import React, { Component } from 'react';
import NetwalkUI from './NetwalkUI';
import Netwalk from './Netwalk';

export default class NetwalkGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: []
    };

    this.rotateNode = this.rotateNode.bind(this);
  }

  componentDidMount() {

    this.Netwalk = new Netwalk;

    this.Netwalk.registerGeneratorCallback((function(board) {
      this.setState({
        board: board
      });
    }).bind(this));

    this.Netwalk.generateBoard(3, 3);
  }

  render() {
    return <NetwalkUI board={this.state.board} onRotate={this.rotateNode} />;
  }

  rotateNode(id) {
    this.Netwalk.turnNode(id);
    this.setState({
      board: this.Netwalk.getCurrentBoard()
    });
  }
}
