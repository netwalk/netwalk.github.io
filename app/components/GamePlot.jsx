import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import NetwalkGame from './NetwalkGame';
import pureRender from 'pure-render-decorator';

@pureRender
export default class GamePlot extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  }

  static defaultProps = {
    width: 300,
    height: 300
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
