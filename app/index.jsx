import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import NetwalkGame from './components/NetwalkGame';

const app = document.createElement('div');
app.style.width = '100%';
app.style.height = document.documentElement.clientHeight+'px';
document.body.appendChild(app);

let width = app.offsetWidth,
    height = app.offsetHeight,
    multiplier = 100;

// Convert 639 to 600, 231 to 200, 
if (width >= multiplier) {
  width -= width % multiplier;
} else {
  width = multiplier
}
if (height >= multiplier) {
  height -= height % multiplier;
} else {
  height = multiplier;
}

let difficulty_level = 1,
    node_size;

if (width >= height) {
  node_size = width / (width / multiplier) / difficulty_level;
} else if (height > width) {
  node_size = height / (height / multiplier) / difficulty_level;
}

const rows = Math.floor(height / node_size);
const columns = Math.floor(width / node_size);

ReactDOM.render(<NetwalkGame rows={rows} columns={columns} />, app);
