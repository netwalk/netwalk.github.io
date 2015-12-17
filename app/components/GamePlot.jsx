import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NetwalkGame from './NetwalkGame';

class GamePlot extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let width = this.props.width,
        height = this.props.height,
        multiplier = 50;

    // Convert 639 to 600, 231 to 200, 
    if (width >= multiplier) {
      width -= width % multiplier;
    } else {
      width = multiplier
    }
    if (height >= multiplier) {
      height -= height % multiplier;
    } else {
      height = multiplier;
    }

    let difficulty_level = 1,
        node_size;

    if (width >= height) {
      node_size = width / (width / multiplier) / difficulty_level;
    } else if (height > width) {
      node_size = height / (height / multiplier) / difficulty_level;
    }

    const rows = Math.floor(height / node_size);
    const columns = Math.floor(width / node_size);

    return <NetwalkGame
            rows={rows}
            columns={columns}
            animate={true}
            animationWait={100}
            randomize={false} />;
  }

}

GamePlot.defaultProps = {
  width: 300,
  height: 300
}

export default GamePlot;
