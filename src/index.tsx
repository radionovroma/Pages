import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/index.scss';
import { makeServer } from './server';

makeServer();

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(<App/>);
