import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import Radium from 'radium';

@pureRender
@Radium
export default class Mask extends Component {
  static propTypes = {
    opacity: PropTypes.number
  }

  static defaultProps = {
    opacity: 0.9
  }

  render() {
    return <div style={{
      width: '100%', height: '100%',
      opacity: this.props.opacity,
      backgroundColor: '#fff',
      position: 'absolute',
      top: 0,
      left: 0
    }} />
  }
}

const styles = {
  
}
