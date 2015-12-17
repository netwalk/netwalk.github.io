import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Logo extends Component {
  render() {
    return <h1 style={styles}>Netwalk</h1>
  }
}

const styles = {
  color: '#8EC170',
  fontFamily: '"Courier New", "Courier", monospace',
  fontSize: '45px',
  '@media (min-width: 640px)': {
    fontSize: '75px',
  },
  fontWeight: '100',
  margin: '1em 0 0',
  textAlign: 'center'
}
