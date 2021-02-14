import React from 'react';
import './viewPlaylistsStyle.css'
import '../../app/App.css';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: this.props.playlists,
    }
  }

  selectPlaylist(playlistID) {
    this.props.setState({selectedScreen: "viewTracks", selectedPlaylistID: playlistID});
    console.log(playlistID);
    console.log("clicked");
  }

  render() {
    console.log(this.state.playlists);
    return (
      <div className="viewPlaylists">
        <h2>Your Playlists</h2>
        {/* <hr></hr> */}
        <div className="playlistsFlexBox">
          {this.state.playlists.items ? this.state.playlists.items.map((playlist) => {
            return (
              <div className="playlist">
                <div className="playlistImage hoverCursor" onClick={() => this.selectPlaylist(playlist.id)}>
                  <img src={playlist.images[0].url} alt="Playlist Image"></img>
                </div>
                <div className="playlistInfo">
                  <h3 className="hoverCursor" onClick={() => this.selectPlaylist(playlist.id)}>{playlist.name}</h3>
                  <h4>50 tracks</h4> {/* TODO: obtain tracks from backend */}
                </div>
              </div>
            )
          }) : ""}
        </div>
      </div>
    )
  }
}