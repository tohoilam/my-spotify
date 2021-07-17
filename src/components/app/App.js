import React, { useEffect, useState } from 'react';
import './App.css';
import Login from '../login/login';
import Home from '../home/home';
import { getTokenFromUrl } from '../../api/spotify_login_api';
import SpotifyApi from '../../api/spotify_api';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      spotifyApi: new SpotifyApi(),
      token: "",
    }
  }

  componentWillMount() {
    const response = getTokenFromUrl()
    window.location.hash = ""; // so that I won't see the token in the search part
    const _token = response.access_token;

    if (_token) {
      this.setState({token: _token});
      this.state.spotifyApi.setAccessToken(_token);

    }
  }

  render() {
    return (
      <div className="app">
        { // this part means if token exist, go to main page, if not, go to login page
          this.state.token !== "" ? (
            <div>
              <Home spotifyApi={this.state.spotifyApi}/>
            </div>
          ) : (
            <Login />
          )
        }
        
      </div>
    );
  }
}
