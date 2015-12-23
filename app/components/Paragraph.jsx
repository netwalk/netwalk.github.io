import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';
import Radium from 'radium';

@pureRender
@Radium
export default class Paragraph extends Component {

  render() {
    return (
      <p style={[styles.base, this.props.styles]}>
        {this.props.children}
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
    margin: '2em 0',
    lineHeight: '1.5em',
    textAlign: 'center'
  }
}
