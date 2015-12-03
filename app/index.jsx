import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import NetwalkGame from './components/NetwalkGame';

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<NetwalkGame rows="5" columns="10" />, app);
