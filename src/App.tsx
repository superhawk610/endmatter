import React from 'react';
import { render } from 'react-dom';
import './App.css';

import { RouterProvider, Router, Route, Redirect } from './Router';
import { AppProvider } from './AppContext';
import { Story } from './Story';
import { Sidebar } from './Sidebar';
import { Document } from './Document';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Router>
        {/* matches story OR story/:pid */}
        <Route match={/story\/?(.*)/}>
          <Story />
        </Route>
        <Route match="json">
          <Document />
        </Route>
        <Route>
          <Redirect to="story" />
        </Route>
      </Router>
    </div>
  );
}

const root = document.getElementById('root');
render(
  <React.StrictMode>
    <RouterProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </RouterProvider>
  </React.StrictMode>,
  root
);
