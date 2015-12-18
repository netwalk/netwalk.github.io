import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class LevelDown extends Component {
  render() {
    return (
      <div style={styles.base}>
        <span style={styles.text}>Too hard?</span>
        <button style={styles.button} onClick={this.props.onTrigger}>
          Remove a row
        </button>
      </div>
    )
  }
}

const styles = {
  base: {
    textAlign: 'left',
    paddingTop: '15px',
    '@media (min-width: 640px)': {
      paddingTop: '25px'
    }
  },
  text: {
    color: '#C1C1C1',
    fontFamily: '"Courier New", "Courier", monospace',
    fontSize: '18px',
    '@media (min-width: 640px)': {
      fontSize: '24px',
    },
    fontWeight: '100',
  },
  button: {
    color: '#BE6D6C',
    backgroundColor: '#fff',
    border: '1px solid #BE6D6C',
    fontFamily: '"Courier New", "Courier", monospace',
    fontSize: '18px',
    '@media (min-width: 640px)': {
      fontSize: '24px',
    },
    fontWeight: '100',
    marginLeft: '15px',
    padding: '2px 5px',
    ':hover': {
      cursor: 'pointer',
      border: '1px solid #D8A2A1',
      color: '#D8A2A1'
    },
    ':focus': {
      outline:0
    }
  }
}
