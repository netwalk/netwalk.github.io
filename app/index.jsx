import './main.css';

import 'array.prototype.findindex';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

main();

function main()
{
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<App rows="3" columns="3" />, app);
}
