import React, { Component } from 'react';
import Paragraph from './Paragraph';
import pureRender from 'pure-render-decorator';
import Radium from 'radium';

@pureRender
@Radium
export default class HowToPlay extends Component {
  render() {
    return (
      <Paragraph>
        <strong>How to play:</strong> Click on a tile
        to rotate it clockwise. Your goal is to connect all tiles to the
        server.
      </Paragraph>
    )
  }
}
