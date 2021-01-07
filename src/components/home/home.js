import React, { useEffect, useState } from 'react';
import SideBar from '../sideBar/sideBar';
import YourSpotify from '../yourSpotify/yourSpotify';
import Statistics from '../statistics/statistics';
import './homeStyle.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedScreen: "yourSpotify",
      userPlaylists: {},
      userInfo: {},
      currentlyPlaying: {},
      currentPlayer: {},
      recentlyPlayed: {},
      playlist: {},
      isLoaded: false,
    }
  }

  async fetchUserPlaylists() {
    const response = await this.props.spotifyApi.getUserPlaylists();
    this.setState({userPlaylists: response});

    await this.fetchPlaylist(this.state.userPlaylists.items[0].id);
    return true;
  }

  async fetchUserInfo() {
    const response = await this.props.spotifyApi.getUserInfo();
    this.setState({userInfo: response});
    console.log(this.state.userInfo);
    return true;
  }

  async fetchCurrentlyPlaying() {
    const response = await this.props.spotifyApi.getCurrentlyPlaying();
    this.setState({currentlyPlaying: response});
    return true;
  }

  async fetchCurrentPlayer() {
    const response = await this.props.spotifyApi.getCurrentPlayer();
    this.setState({currentPlayer: response});
    return true;
  }

  async fetchRecentlyPlayed() {
    const response = await this.props.spotifyApi.getRecentlyPlayed();
    this.setState({recentlyPlayed: response});
    return true;
  }

  async fetchPlaylist(playlistID) {
    const response = await this.props.spotifyApi.getPlaylist(playlistID);
    this.setState({playlist: response});
  }

  async loadInfo() {
    await this.fetchUserInfo();
    await this.fetchUserPlaylists();
    await this.fetchCurrentlyPlaying();
    await this.fetchCurrentPlayer();
    await this.fetchRecentlyPlayed();
    this.setState({isLoaded: true});
    console.log("Loaded");
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      this.loadInfo();
    }
    
  }

  mainBody() {
    if (this.state.selectedScreen === "yourSpotify") {
      return <YourSpotify spotifyStates={this.state}/>;
    }
    else if (this.state.selectedScreen === "statistics") {
      return <Statistics spotifyStates={this.state}/>;
    }
  }

  render() {
    console.log("render");
    if (!this.state.isLoaded) {
      return (
        <div>Loading...</div>
      )
    }

    return ( 
      <div>

        <SideBar setState={state => this.setState(state)} spotifyStates={this.state}/>
        <div className="mainBody">
          {this.mainBody()}
          {/* {this.state.playlist && this.state.playlist.tracks ? this.state.playlist.tracks.items.map(item => {
            return <p>{item.track.name}</p>;
          }) : ""} */}
        </div>
      </div>
    );
  }
  
}