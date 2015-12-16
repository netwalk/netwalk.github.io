import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import NetwalkGame from './components/NetwalkGame';

const app = document.createElement('div');
app.style.width = '100%';
app.style.height = document.documentElement.clientHeight+'px';
document.body.appendChild(app);

const width = app.offsetWidth,
      height = app.offsetHeight,

      node_size = Math.max(width, height) / 100 * 13,

      rows = Math.floor(height / node_size),
      columns = Math.floor(width / node_size);

ReactDOM.render(<NetwalkGame rows={rows} columns={columns} />, app);
