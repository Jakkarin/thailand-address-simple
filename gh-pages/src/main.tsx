import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AddressProvider from './providers/AddressProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AddressProvider>
      <App />
    </AddressProvider>
  </React.StrictMode>
);
