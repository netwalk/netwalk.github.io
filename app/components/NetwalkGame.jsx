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
      if (this.Netwalk.isMatrixReady(matrix)) {
        this.Netwalk.randomizeMatrixAsync(matrix, (function(matrix) {
          this.setState({
            matrix: matrix
          });
        }).bind(this), 10);
      }
    }).bind(this), 10);

    // Option #2
    // const matrix = this.Netwalk.generateMatrix(this.props.rows, this.props.columns);
    // this.setState({
    //   matrix: this.Netwalk.randomizeMatrix(matrix)
    // });
  }

  render() {
    return <NetwalkUI matrix={this.state.matrix} onRotate={this.rotateNode.bind(this)} />;
  }

  rotateNode(id) {
    this.setState({
      matrix: this.Netwalk.rotateNode(id, this.state.matrix)
    });
  }

}

NetwalkGame.defaultProps = {
  rows: 3,
  columns: 5
}

export default NetwalkGame;
