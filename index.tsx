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

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('CRITICAL ERROR: Could not find root element to mount to. Ensure <div id="root"></div> exists in index.html.');
    return;
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  );
};

// Ensure DOM is fully loaded before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
