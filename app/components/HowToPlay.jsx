import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class HowToPlay extends Component {
  render() {
    return (
      <p style={styles.base}>
        <strong style={styles.strong}>How to play:</strong> Click on a tile
        to rotate it clockwise. Your goal is to connect all tiles to the
        server.
      </p>
    )
  }
}

const styles = {
  base: {
    color: '#7B7B7B',
    fontFamily: '"Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif',
    fontSize: '16px',
    '@media (min-width: 640px)': {
      fontSize: '22px',
    },
    fontWeight: '200',
    margin: '2em 0 0em',
    lineHeight: '1.5em',
    textAlign: 'center'
  },
  strong: {
    fontWeight: '500'
  }
}
