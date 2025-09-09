import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './app';
// import { HashRouter } from 'react-router-dom';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    // <HashRouter>
    //   <RecoilRoot>
        // <div id="MODAL"></div>
        <App />
    //   </RecoilRoot>
    // </HashRouter>
  // </React.StrictMode>
);
