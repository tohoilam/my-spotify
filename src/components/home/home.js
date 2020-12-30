import React, { useEffect, useState } from 'react';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
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

  render() {
    return (
      <div>
        {this.state.playlist && this.state.playlist.tracks ? this.state.playlist.tracks.items.map(item => {
          return <p>{item.track.name}</p>;
        }) : ""}
        {/* {console.log(JSON.stringify(this.state.playlist.tracks))} */}
        
      </div>
    );
  }
  
}