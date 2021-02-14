import React from 'react';
import './login.css';
import { loginUrl } from '../../api/spotify_login_api';
// import '../app/App.css';
import '../app/App.css';

function Login() {
  return (
    <div className="login">
      <div className="title">
        <h1 classname="spotifyGreenFont">My Spotify</h1>
        <h3>By: To Hoi Lam (Alex)</h3>
      </div>
      <a className="spotifyGreenFont" href={loginUrl}>Login with your Spotify account</a>
      {/* Spotify Logo */}
      {/* Login with spotify component */}
    </div>
  )
}

export default Login;