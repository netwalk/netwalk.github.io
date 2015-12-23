import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';
import Radium from 'radium';

@pureRender
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
    textAlign: 'center',
    padding: '15px 0',
    '@media (min-width: 640px)': {
      padding: '25px 0'
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
    backgroundColor: '#fff',
    border: '1px solid #7B7B7B',
    color: '#7B7B7B',
    fontFamily: '"Courier New", "Courier", monospace',
    fontSize: '18px',
    '@media (min-width: 640px)': {
      fontSize: '24px',
    },
    fontWeight: '100',
    marginLeft: '15px',
    padding: '2px 5px',
    ':hover': {
      border: '1px solid #B3B3B3',
      color: '#B3B3B3',
      cursor: 'pointer'
    },
    ':focus': {
      outline:0
    }
  }
}
