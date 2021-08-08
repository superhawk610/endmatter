import React from 'react';
import { render } from 'react-dom';
import './App.css';

const App = () => {
  return <div>Hello, world!</div>;
};

const root = document.getElementById('root');
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
