import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Subtitle extends Component {
  render() {
    return (
      <p style={styles.base}>
        Rotate pieces clockwise and connect all nodes <strong style={styles.strong}>to the server!</strong>
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
    margin: '2em 0 2em',
    lineHeight: '1.5em',
    textAlign: 'center'
  },
  strong: {
    fontWeight: '500',
  }
}
