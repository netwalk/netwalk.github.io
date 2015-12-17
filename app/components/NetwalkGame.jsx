import React, { Component, PropTypes } from 'react';
import NetwalkUI from './NetwalkUI';
import Netwalk from './Netwalk';
import PlayButton from './PlayButton';
import _ from 'underscore';
import Radium from 'radium';

@Radium
class NetwalkGame extends Component {
  static propTypes = {
    rows: PropTypes.number,
    columns: PropTypes.number,
    animate: PropTypes.bool,
    animationWait: PropTypes.number,
    randomize: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = {
      matrix: [],
      gameStarted: false,
      gameEnded: false
    };
  }

  componentDidMount() {
    this.generateMatrix({
      animate: this.props.animate,
      animationWait: this.props.animationWait,
      randomize: this.props.randomize
    });
  }

  render() {
    let Play;

    // Only show "Start Game" button if game has not yet started
    if (!this.state.gameStarted) {
      Play = <PlayButton onPlay={this.onPlay.bind(this)} />;
    }

    return (
      <div style={styles.base}>
        <div style={[!this.state.gameStarted && styles.board]}>
          <NetwalkUI matrix={this.state.matrix} onRotate={this.rotateNode.bind(this)} />
        </div>
        {Play}
      </div>
    );
  }

  rotateNode(id) {
    this.setState(_.extend(this.state, {
      matrix: this.Netwalk.rotateNode(id, this.state.matrix)
    }));
  }

  onPlay() {
    this.setState({
      gameStarted: true,
      gameEnded: false,
    });
    this.generateMatrix({
      animate: true,
      animationWait: 10,
      randomize: true
    });
  }

  generateMatrix(options) {

    options = _.extend({
      animate: true,
      animationWait: 100,
      randomize: true
    }, options);

    this.Netwalk = new Netwalk;

    if (options.animate) {
      this.Netwalk.generateMatrixAsync(this.props.rows, this.props.columns, (function(matrix) {
        this.setState(_.extend(this.state, {
          matrix: matrix
        }));
        if (options.randomize && this.Netwalk.isMatrixReady(matrix)) {
          this.Netwalk.randomizeMatrixAsync(matrix, (function(matrix) {
            this.setState(_.extend(this.state, {
              matrix: matrix
            }));
          }).bind(this), options.animationWait);
        }
      }).bind(this), options.animationWait);

    } else {

      let matrix = this.Netwalk.generateMatrix(this.props.rows, this.props.columns);
      if (options.randomize) {
        matrix = this.Netwalk.randomizeMatrix(matrix);
      }
      this.setState(_.extend(this.state, {
        matrix: matrix
      }));

    }
  }

}

NetwalkGame.defaultProps = {
  rows: 3,
  columns: 5,
  animate: true,
  animationWait: 10,
  randomize: true
}

const styles = {
  base: {
    position: 'relative'
  },
  board: {
    filter: 'blur(3px) grayscale(100%)',
    WebkitFilter: 'blur(3px) grayscale(100%)'
  }
}

export default NetwalkGame;
