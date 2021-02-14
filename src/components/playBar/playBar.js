import React from 'react';
import '../app/App.css';
import './playBar.css';

export default class PlayBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spotifyApi: this.props.spotifyApi,
      currentlyPlaying: {},
      isLoaded: false,
      albumImageUrl: "https://www.htmlcsscolor.com/preview/gallery/2E2E2E.png",
      currentlyPlayingSongName: "No Song Playing",
      currentlyPlayingArtists: "",
    }
  }

  updateCurrentlyPlaying() {
    const albumImageUrl = this.state.currentlyPlaying
      ? (this.state.currentlyPlaying.item ? this.state.currentlyPlaying.item.album.images[0].url : "https://www.htmlcsscolor.com/preview/gallery/2E2E2E.png")
      : "https://www.htmlcsscolor.com/preview/gallery/2E2E2E.png";
    this.setState({albumImageUrl: albumImageUrl});

    const currentlyPlayingSongName = this.state.currentlyPlaying
      ? (this.state.currentlyPlaying.item ? this.state.currentlyPlaying.item.name : "")
      : "No Song Playing";
    this.setState({currentlyPlayingSongName: currentlyPlayingSongName});

    const currentlyPlayingArtists = this.state.currentlyPlaying
    ? (this.state.currentlyPlaying.item ? this.state.currentlyPlaying.item.artists.map(artist => artist.name).join(', ') : "")
    : "";
    this.setState({currentlyPlayingArtists: currentlyPlayingArtists});
  }

  async fetchCurrentlyPlaying() {
    const response = await this.props.spotifyApi.getCurrentlyPlaying();
    console.log(response);
    if (response) {
      this.setState({currentlyPlaying: response});
      if (!this.state.isLoaded) {
        this.setState({isLoaded: true});
      }
    }
    
    this.updateCurrentlyPlaying();
    
    return true;
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      this.fetchCurrentlyPlaying();
    }
  }

  componentWillMount() {
    setInterval(() => {
      this.fetchCurrentlyPlaying();
    }, 1000)
  }

  render() {
    return (
      <div id="playBar" class="lightGreyBackground">
        <div id="currentlyPlaying">
          <div id="currentlyPlayingImage">
            <img src={this.state.albumImageUrl} alt="Currently Playing Playlist Image" />
          </div>
          <h3>{this.state.currentlyPlayingSongName}</h3>
          <h4 className="lightGreyFont">{this.state.currentlyPlayingArtists}</h4>
        </div>

      </div>
    );
  }
}