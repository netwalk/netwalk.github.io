import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class App extends Component {
  render() {
    return (
      <div style={styles}>
        {this.props.children}
      </div>
    )
  }
}

const styles = {
  width: '100%',
  margin: 'auto',
  padding: '1em',
  '@media (min-width: 640px)': {
    width: '640px'
  }
}
