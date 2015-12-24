import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';
import Radium from 'radium';

@Radium
@pureRender
export default class Logo extends Component {
  render() {
    return <h1 style={styles}>Netwalk</h1>
  }
}

const styles = {
  color: '#8EC170',
  fontFamily: '"Courier New", "Courier", monospace',
  fontSize: '45px',
  fontWeight: 100,
  margin: '1em 0 0',
  textAlign: 'center',
  '@media (min-width: 640px)': {
    fontSize: '75px'
  }
}
