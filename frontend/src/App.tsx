import React from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './hooks/useRoutes';


function App() {

  const routes =  useRoutes(false);


  return (
    <BrowserRouter >
      <div className="App">
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;
