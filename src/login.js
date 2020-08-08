import React from 'react';
import './login.css';
import { loginUrl } from './loginUrl';

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