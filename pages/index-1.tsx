import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';

// Legacy hash compatibility (pre-router build used '#admin' and '#site/<id>')
(() => {
  const h = window.location.hash || '';
  if (h === '#admin') window.location.hash = '#/admin';
  if (h.startsWith('#site/')) window.location.hash = '#/site/' + h.slice('#site/'.length);
})();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
