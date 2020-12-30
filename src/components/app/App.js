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

  async fetchUser() {
    const response = await this.state.spotifyApi.getUserInfo();
    console.log(response);
    return response;
  };

  componentWillMount() {
    const response = getTokenFromUrl()
    window.location.hash = ""; // so that I won't see the token in the search part
    const _token = response.access_token;

    if (_token) {
      this.state.token = _token;
      console.log(this.state.token);

      this.state.spotifyApi.setAccessToken(_token);
      this.fetchUser();

    }
  }

  render() {
    return (
      <div className="app">
        { // this part means if token exist, go to main page, if not, go to login page
          this.state.token != "" ? (
            <div>
              <h1>Logged in</h1>
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
