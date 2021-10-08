import React, { useState } from 'react';
import './App.css';


import { useRoutes } from './hooks/useRoutes';
import { useAuth } from './hooks/useAuth';

import {AppContext} from './contexts/AppContext'
import {io , Socket } from 'socket.io-client';


function App() {

  const { token , setToken , apiEndpoint , login , logout } = useAuth();

  const [ username , setUsername ] = useState<string | null>('');
  const [ profileImage , setProfileImage ] = useState<string | null>('');

  const routes =  useRoutes(!!token);

  const socketIO : Socket = io(apiEndpoint.replace(/\/api/gmi , ''));
  socketIO.connect(); 

  return (
    <AppContext.Provider value = {{
      token,
            setToken,
            apiEndpoint , 
            login,
            logout,
            io : socketIO,
            username , 
            setUsername,
            profileImage , 
            setProfileImage
          }} >
        <div className="App">
            {routes}
        </div>
    </AppContext.Provider>
  );
}

export default App;
