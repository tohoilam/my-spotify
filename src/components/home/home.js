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
    }
  }

  async fetchUserPlaylists() {
    const response = await this.props.spotifyApi.getUserPlaylists();
    this.setState({userPlaylists: response});

    await this.fetchPlaylist(this.state.userPlaylists.items[0].id);
  }

  async fetchUserInfo() {
    const response = await this.props.spotifyApi.getUserInfo();
    this.setState({userInfo: response});
  }

  async fetchCurrentlyPlaying() {
    const response = await this.props.spotifyApi.getCurrentlyPlaying();
    this.setState({currentlyPlaying: response});
  }

  async fetchCurrentPlayer() {
    const response = await this.props.spotifyApi.getCurrentPlayer();
    this.setState({currentPlayer: response});
  }

  async fetchRecentlyPlayed() {
    const response = await this.props.spotifyApi.getRecentlyPlayed();
    this.setState({recentlyPlayed: response});
  }

  async fetchPlaylist(playlistID) {
    const response = await this.props.spotifyApi.getPlaylist(playlistID);
    this.setState({playlist: response});
  }

  componentWillMount() {
    this.fetchUserPlaylists();
    this.fetchUserInfo();
    this.fetchCurrentlyPlaying();
    this.fetchCurrentPlayer();
    this.fetchRecentlyPlayed();
  }

  // sideBarItemListener(selected) {
  //   // this.setState({selectedScreen: selected});
  //   console.log(this.state.selectedScreen);
  //   // if (selected) {
  //   //   this.state.selectedScreen = selected;
  //   // }
    
  //   // console.log(selected);
  // }

  mainBody() {
    // console.log(this.state);
    if (this.state.selectedScreen === "yourSpotify") {
      return <YourSpotify />;
    }
    else if (this.state.selectedScreen === "statistics") {
      return <Statistics />;
    }
  }

  render() {
    return ( 
      <div>
        <SideBar setState={state => this.setState(state)}/>
        <div className="mainBody">
          {this.mainBody()}
          {this.state.playlist && this.state.playlist.tracks ? this.state.playlist.tracks.items.map(item => {
            return <p>{item.track.name}</p>;
          }) : ""}
        </div>
      </div>
    );
  }
  
}