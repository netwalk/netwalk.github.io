import React, { Component } from 'react';
import Paragraph from './Paragraph';
import pureRender from 'pure-render-decorator';
import Radium from 'radium';

@pureRender
@Radium
export default class Subtitle extends Component {
  render() {
    return (
      <Paragraph>
        Rotate pieces clockwise and connect all nodes <strong>to the server!</strong>
      </Paragraph>
    )
  }
}
