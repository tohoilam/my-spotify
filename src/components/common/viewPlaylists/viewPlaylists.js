import React from 'react';
import './viewPlaylistsStyle.css'

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: this.props.playlists,
    }
  }

  render() {
    console.log(this.state.playlists);
    return (
      <div>
        Your Playlists
        <div className="playlistsFlexBox">
          {this.state.playlists.items ? this.state.playlists.items.map((playlist) => {
            return (
              <div className="playlist">
                <div className="playlistImage">
                  <img src={playlist.images[0].url} alt="Playlist Image"></img>
                </div>
                <div className="playlistInfo">
                  <h3>{playlist.name}</h3>
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