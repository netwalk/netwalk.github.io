import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';
import Radium from 'radium';
import CSSModules from 'react-css-modules';
import styles from './Logo.css';

@CSSModules(styles)
@pureRender
export default class Logo extends Component {
  render() {
    return <h1 styleName='Logo'>Netwalk</h1>
  }
}
