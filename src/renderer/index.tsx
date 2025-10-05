import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './app';
import IconProvider from './providers/IconProvider';
import { HashRouter } from 'react-router-dom';
import { PORTABLE_ID } from '../../src/constants/constants';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <IconProvider>
        <App />
        <div id={PORTABLE_ID}></div>
      </IconProvider>
    </HashRouter>
  </React.StrictMode>
);
