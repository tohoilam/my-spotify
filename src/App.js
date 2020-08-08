import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './login';
import { getTokenFromUrl } from './loginUrl';

function App() {
  
  const [token, setToken] = useState(null);

  useEffect(() => {
    const response = getTokenFromUrl()
    window.location.hash = ""; // so that I won't see the token in the search part
    const _token = response.access_token;
    
    if (_token) {
      setToken(_token);
    }
    
  }, []);
  

  return (
    <div className="app">
      { // this part means if token exist, go to main page, if not, go to login page
        token ? (
          <h1>Logged in</h1>
        ) : (
          <Login />
        )
      }
      
    </div>
  );
}

export default App;
