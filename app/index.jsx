import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import NetwalkGame from './components/NetwalkGame';

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<NetwalkGame />, app);
