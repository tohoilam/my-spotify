import React from 'react';
import './yourSpotifyStyle.css';
import Overview from './overview/overview';
import PublicPlaylists from './publicPlaylists/publicPlaylists';

export default class YourSpotify extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedSection: "overview",
      userInfo: this.props.spotifyStates.userInfo,
    }
  }

  topSection() {
    if (this.state.selectedSection === "overview") {
      return <Overview spotifyStates={this.props.spotifyStates}/>
    }
    else if (this.state.selectedSection === "publicPlaylists") {
      return <PublicPlaylists spotifyStates={this.props.spotifyStates}/>
    }
  }

  render() {
    return (
      <div>
        <div id="topSection">
          <div id="topBar"></div>
          <div id="userSection">
            <div id="userSectionImage">
              <img src={this.state.userInfo.images[0].url} alt="User Profile Image"></img>
            </div>
            <div id="userName">
              <h4>{this.state.userInfo.type}</h4>
              <h1>{this.state.userInfo.display_name}</h1>
              <div id="more"></div>
            </div>
          </div>
          <div id="selection">
            <div className="userSelectionItem" onClick={() => {this.setState({selectedSection: "overview"})}}>
              OVERVIEW
              <div className="lightUpBox"></div>
            </div>
            <div className="userSelectionItem" onClick={() => {this.setState({selectedSection: "publicPlaylists"})}}>
              PUBLIC PLAYLISTS
              <div className="lightUpBox"></div>
            </div>
            <div className="userSelectionItem">
              FOLLOWING
              <div className="lightUpBox"></div>
            </div>
            <div className="userSelectionItem">
              FOLLOWERS
              <div className="lightUpBox"></div>
            </div>
          </div>
        </div>
        <div id="topSection">
          {this.topSection()}
        </div>
      </div>
    )
  }
}