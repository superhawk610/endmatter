import React from 'react';
import { render } from 'react-dom';
import './App.css';

import { AppProvider } from './AppContext';
import { Sidebar } from './Sidebar';
import { Document } from './Document';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Document />
    </div>
  );
}

const root = document.getElementById('root');
render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  root
);
