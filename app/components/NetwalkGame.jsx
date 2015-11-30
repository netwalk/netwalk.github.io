import React, { Component } from 'react';
import NetwalkUI from './NetwalkUI';
import Netwalk from './Netwalk';

export default class NetwalkGame extends Component {

  constructor(props) {
    super(props);

    this.state = {
      matrix: []
    };

    this.rotateNode = this.rotateNode.bind(this);
  }

  componentDidMount() {

    this.Netwalk = new Netwalk;

    this.Netwalk.registerGeneratorCallback((function(matrix) {
      this.setState({
        matrix: matrix
      });
    }).bind(this));

    this.Netwalk.generateMatrix(3, 3);
  }

  render() {
    return <NetwalkUI matrix={this.state.matrix} onRotate={this.rotateNode} />;
  }

  rotateNode(id) {
    this.Netwalk.rotateNode(id);
    this.setState({
      matrix: this.Netwalk.getCurrentMatrix()
    });
  }

}
