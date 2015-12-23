import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';
import Radium from 'radium';

@pureRender
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
