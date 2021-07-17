import React from 'react';
import './viewTracksStyle.css';
import '../../app/App.css';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistID: this.props.playlistID,
      playlist: {},
      isLoaded: false,
    }
  }

  async fetchPlaylist(playlistID) {
    const response = await this.props.spotifyApi.getPlaylist(playlistID);
    this.setState({playlist: response});
    this.setState({isLoaded: true});
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      this.fetchPlaylist(this.state.playlistID);
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="fontFamily">Loading...</div>
      )
    }

    return (
      <div>
        <div id="topBar" className="lightGreyBackground">

        </div>
        <div id="playlistHeaderSection" className="colorGradientBackground">
          <div id="playlistImage">
            <img src={this.state.playlist.images[0].url} alt="Playlist Cover Image"></img>
          </div>
          <div id="playlistInfo" className="fontFamily">
            <h4>{this.state.playlist.type}</h4>
            <h2 className="fontFamilyBold">{this.state.playlist.name}</h2>
            <h4>By ...</h4>
            <h4>{this.state.playlist.tracks.total} songs</h4>
          </div>
        </div>
        <div id="tracksSection">
          {this.state.playlist && this.state.playlist.tracks ? this.state.playlist.tracks.items.map(item => {
            const duration = parseInt(item.track.duration_ms, 10) / 1000;
            let duration_s = duration % 60;
            duration_s = duration_s.toFixed(0).toString();
            duration_s = duration_s.length === 1 ? "0" + duration_s : duration_s;
            let duration_m = duration / 60;
            duration_m = duration_m.toString();
            duration_m = duration_m.slice(0, duration_m.indexOf('.'));
            duration_m = duration_m.length === 1 ? "0" + duration_m : duration_m;
            const duration_string = duration_m + ":" + duration_s;

            return (
              <div className="track trackHover fontFamily">
                <div className="trackName trackItems textOverflow">{item.track.name}</div>
                <div className="trackArtist trackItems textOverflow">{item.track.artists.map(artist => artist.name)}</div>
                <div className="trackAlbum trackItems textOverflow">{item.track.album.name}</div>
                <div className="trackAddedDate trackItems textOverflow">{item.added_at.slice(0,10)}</div>
                <div className="trackDuration trackItems textOverflow">{duration_string}</div>
              </div>
            );
          }) : ""}
          <div className="track"></div>
        </div>
        {/* {this.state.playlist.name}
        {this.state.playlist.id} */}
        {console.log(this.state.playlist)}
      </div>
    )
  }
}