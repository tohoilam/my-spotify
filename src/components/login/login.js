import React from 'react';
import './login.css';
import { loginUrl } from '../../api/spotify_login_api';

function Login() {
  return (
    <div className="login">
      <a href={loginUrl}>Login with your Spotify </a>
      {/* Spotify Logo */}
      {/* Login with spotify component */}
    </div>
  )
}

export default Login;