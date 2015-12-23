import React, { Component, PropTypes } from 'react';
import NetwalkUI from './NetwalkUI';
import Netwalk from './Netwalk';
import PlayButton from './PlayButton';
import LevelUp from './LevelUp';
import LevelDown from './LevelDown';
import Mask from './Mask';
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

  static defaultProps = {
    rows: 3,
    columns: 5,
    animate: true,
    animationWait: 10,
    randomize: true
  }

  constructor(props) {
    super(props);

    this.state = {
      matrix: [],
      gameStarted: false,
      gameEnded: false,
      rows: this.props.rows
    };
  }

  componentDidMount() {
    this.generateMatrix({
      rows: this.props.rows,
      columns: this.props.columns,
      animate: this.props.animate,
      animationWait: this.props.animationWait,
      randomize: this.props.randomize
    });
  }

  render() {
    let Play,
        Replay,
        mask,
        IncreaseDifficulty,
        DecreaseDifficulty;

    // Only show "Start Game" button if game has not yet started
    if (!this.state.gameStarted && !this.state.gameEnded) {
      Play = <PlayButton onPlay={this.onPlay.bind(this)} title="New Game" />;
    }

    if (!this.state.gameStarted && this.state.gameEnded) {
      Replay = <PlayButton onPlay={this.onPlay.bind(this)} title="Play again?" />;
    }

    if (!this.state.gameStarted) {
      mask = <Mask opacity={0.6} />
    }
    if (!this.state.gameStarted && this.state.gameEnded) {
      mask = <Mask opacity={0.4} />
    }

    if (this.state.gameStarted && !this.state.gameEnded) {
      IncreaseDifficulty = <LevelUp onTrigger={this.addRow.bind(this)} />

      if (this.state.rows > 2) {
        DecreaseDifficulty = <LevelDown onTrigger={this.removeRow.bind(this)} />
      }
    }

    return (
      <div style={styles.base}>
        <div style={styles.difficultyContainer}>
          {IncreaseDifficulty}
          {DecreaseDifficulty}
        </div>
        <div style={[!this.state.gameStarted && !this.state.gameEnded && styles.blur]}>
          <NetwalkUI matrix={this.state.matrix} onRotate={this.rotateNode.bind(this)} />
        </div>
        {mask}
        {Play}
        {Replay}
      </div>
    );
  }

  rotateNode(id) {
    let matrix = this.Netwalk.rotateNode(id, this.state.matrix),
        gameEnded = this.Netwalk.isMatrixSolved(matrix),
        gameStarted = !gameEnded;

    this.setState(_.extend(this.state, {
      matrix: matrix,
      gameStarted: gameStarted,
      gameEnded: gameEnded
    }));
  }

  addRow() {
    this.generateMatrix({
      rows: this.state.rows + 1,
      columns: this.props.columns,
      animate: false,
      randomize: true
    });
  }

  removeRow() {
    if (this.state.rows > 2) {
      this.generateMatrix({
        rows: this.state.rows - 1,
        columns: this.props.columns,
        animate: false,
        randomize: true
      });
    }
  }

  onPlay() {
    this.setState({
      gameStarted: true,
      gameEnded: false,
    });
    this.generateMatrix({
      rows: this.state.rows,
      columns: this.props.columns,
      animate: true,
      animationWait: 10,
      randomize: true
    });
  }

  generateMatrix(options) {

    options = _.extend({
      rows: 3,
      columns: 5,
      animate: true,
      animationWait: 100,
      randomize: true
    }, options);

    this.Netwalk = new Netwalk;

    if (options.animate) {
      this.Netwalk.generateMatrixAsync(options.rows, options.columns, (function(matrix) {
        this.setState(_.extend(this.state, {
          rows: options.rows,
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

      let matrix = this.Netwalk.generateMatrix(options.rows, options.columns);
      if (options.randomize) {
        matrix = this.Netwalk.randomizeMatrix(matrix);
      }
      this.setState(_.extend(this.state, {
        rows: options.rows,
        matrix: matrix
      }));

    }
  }

}

const styles = {
  base: {
    position: 'relative'
  },
  difficultyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  blur: {
    filter: 'blur(3px) grayscale(100%)',
    WebkitFilter: 'blur(3px) grayscale(100%)'
  }
}

export default NetwalkGame;
