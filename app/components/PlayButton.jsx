import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class PlayButton extends Component {
  render() {
    return (
      <div>
        <div style={styles.mask}>
        </div>
        <div style={styles.base}>
          <button style={styles.button} onClick={this.props.onPlay}>
            {this.props.title}
          </button>
        </div>
      </div>
    )
  }
}

const styles = {
  mask: {
    width: '100%',
    height: '100%',
    opacity: '0.8',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0
  },

  base: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    color: '#8EC170',
    backgroundColor: '#fff',
    border: '2px solid #8EC170',
    fontFamily: '"Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif',
    fontSize: '18px',
    '@media (min-width: 640px)': {
      fontSize: '22px',
    },
    fontWeight: '500',
    padding: '10px 10px',
    '@media (min-width: 640px)': {
      padding: '12px 12px'
    },
    ':hover': {
      cursor: 'pointer',
      border: '2px solid #609D3C',
      color: '#609D3C'
    }
  }
}
