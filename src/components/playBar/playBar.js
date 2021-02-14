import React from 'react';

export default class PlayBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spotifyApi: this.props.spotifyApi,
      currentlyPlaying: {},
      isLoaded: false,
    }
  }

  async fetchCurrentlyPlaying() {
    const response = await this.props.spotifyApi.getCurrentlyPlaying();
    if (response) {
      this.setState({currentlyPlaying: response});
      if (!this.state.isLoaded) {
        this.setState({isLoaded: true});
      }
    }
    
    
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
      <div id="playBar">
        {this.state.currentlyPlaying != {}
        ? (this.state.currentlyPlaying.item ? this.state.currentlyPlaying.item.name : "")
        : ""}

      </div>
    );
  }
}