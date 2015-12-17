import './main.scss';

import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import Logo from './components/Logo';
import Subtitle from './components/Subtitle';
import GamePlot from './components/GamePlot';
import HowToPlay from './components/HowToPlay';

const root = document.createElement('div');
document.body.appendChild(root);

const viewport = {
  width: document.documentElement.clientWidth
};
const plot = {
  width: 150,
  height: 100
}
if (viewport.width > 420) {
  plot.width = 200;
  plot.height = 100;
}
if (viewport.width > 520) {
  plot.width = 400;
  plot.height = 100;
}

render(
  <App>
    <Logo />
    <Subtitle />
    <GamePlot width={plot.width} height={plot.height} />
    <HowToPlay />
  </App>,
  root
)
