import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class LevelUp extends Component {
  render() {
    return (
      <div style={styles.base}>
        <span style={styles.text}>Too easy?</span>
        <button style={styles.button} onClick={this.props.onTrigger}>
          Add a row
        </button>
      </div>
    )
  }
}

const styles = {
  base: {
    textAlign: 'left',
    paddingBottom: '15px',
    '@media (min-width: 640px)': {
      paddingBottom: '25px'
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
    color: '#6FBE6C',
    backgroundColor: '#fff',
    border: '1px solid #6FBE6C',
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
      border: '1px solid #B0DDAE',
      color: '#B0DDAE'
    },
    ':focus': {
      outline:0
    }
  }
}
