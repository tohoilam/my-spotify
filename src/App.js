import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './login';
import { getTokenFromUrl } from './spotify_login_api';
import SpotifyApi from './spotify_api';

function App() {
  
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const spotify_api = new SpotifyApi();

  const fetchUser = async () => {
    const response = await spotify_api.getUserInfo();
    setUserInfo(response);
    console.log(response);
    return response;
  };

  useEffect(() => {
    const response = getTokenFromUrl()
    window.location.hash = ""; // so that I won't see the token in the search part
    const _token = response.access_token;
    
    if (_token) {
      setToken(_token);

      spotify_api.setAccessToken(_token);
      // spotify_api.fetchUser().then((user) => {
      //   console.log(user);
      // })
      fetchUser();

    }

    // console.log(spotify_api.fetchUser());
    
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
