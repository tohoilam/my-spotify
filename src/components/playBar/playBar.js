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
      isPlaying: false,
      progress: 0.0,
      progressString: "00:00",
      songDuration: 0.0,
      songDurationString: "00:00",
      progressPercentage: 0.0,
    }
  }

  timeToString(ms) {
    const minute = Math.floor(ms / 1000 / 60)
    const minuteString = (minute < 10) ? "0" + minute.toString(10) : minute;
    const second = Math.floor(ms / 1000 % 60)
    const secondString = (second < 10) ? "0" + second.toString(10) : second;
    
    return minuteString + ":" + secondString;
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

    const isPlaying = this.state.currentlyPlaying
    ? (this.state.currentlyPlaying.is_playing)
    : false;
    this.setState({isPlaying: isPlaying});

    const progress = this.state.currentlyPlaying
    ? (this.state.currentlyPlaying.progress_ms)
    : 0.0;
    this.setState({progress: progress});
    this.setState({progressString: this.timeToString(progress)});

    const songDuration = this.state.currentlyPlaying
    ? (this.state.currentlyPlaying.item ? this.state.currentlyPlaying.item.duration_ms : 0.0)
    : 0.0;
    this.setState({songDuration: songDuration});
    this.setState({songDurationString: this.timeToString(songDuration)});

    this.setState({progressPercentage: progress / songDuration * 100})
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
    }, 200)
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
        <div id="playControl">
          <table id="playControlTable">
            <tr>
              <td id="shuffleButton" class="material-icons md-18 md-light playControlIcon hoverCursor">shuffle</td>
              <td id="nextButton" class="material-icons md-18 md-light playControlIcon hoverCursor">skip_previous</td>
              {
                this.state.isPlaying ? (
                  <td id="playButton" class="material-icons md-36 md-light playControlIcon hoverCursor">pause_circle</td>
                ) : (
                  <td id="playButton" class="material-icons md-36 md-light playControlIcon hoverCursor">play_circle</td>
                )
              }
              <td id="backButton" class="material-icons md-18 md-light playControlIcon hoverCursor">skip_next</td>
              <td id="loopButton" class="material-icons md-18 md-light playControlIcon hoverCursor">loop</td>
            </tr>
          </table>
          <div id="progressBarBox">
            <span class="songSecond lightGreyFont">{this.state.progressString}</span>
            <div class="sliderContainer">
              <input type="range" min="1" max="100" value={this.state.progressPercentage} class="slider hoverCursor" id="songProgress"></input>
            </div>
            <span class="songSecond lightGreyFont">{this.state.songDurationString}</span>
          </div>
          
        </div>
        <div id="playSetting">
          <div class="whiteSpace"></div>
          <div class="volumeSlider">
            <input type="range" min="1" max="100" value="50" class="slider hoverCursor" id="volumeSlider"></input>
          </div>
          <div id="volumeButton" class="material-icons md-18 md-light settingButton hoverCursor">volume_up</div>
          <div id="devicesButton" class="material-icons md-18 md-light settingButton hoverCursor">devices</div>
        </div>
      </div>
    );
  }
}