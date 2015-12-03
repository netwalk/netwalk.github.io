import React, { Component } from 'react';
import NetwalkUI from './NetwalkUI';
import Netwalk from './Netwalk';

class NetwalkGame extends Component {

  constructor(props) {
    super(props);

    this.state = {
      matrix: []
    };
  }

  componentDidMount() {

    this.Netwalk = new Netwalk;

    this.Netwalk.generateMatrixAsync(this.props.rows, this.props.columns, (function(matrix) {
      this.setState({
        matrix: matrix
      });
    }).bind(this), 10);

    // Option #2
    // this.setState({
    //   matrix: this.Netwalk.generateMatrix(this.props.rows, this.props.columns)
    // });

    // Option #3
    // this.Netwalk.generateMatrix(this.props.rows, this.props.columns, (function(matrix) {
    //   this.setState({
    //     matrix: matrix
    //   });
    // }).bind(this));
  }

  render() {
    return <NetwalkUI matrix={this.state.matrix} onRotate={this.rotateNode.bind(this)} />;
  }

  rotateNode(id) {
    this.Netwalk.rotateNode(id);
    this.setState({
      matrix: this.Netwalk.getCurrentMatrix()
    });
  }

}

NetwalkGame.defaultProps = {
  rows: 3,
  columns: 5
}

export default NetwalkGame;
