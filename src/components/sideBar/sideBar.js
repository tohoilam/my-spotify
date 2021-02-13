import React from 'react';
import './sideBarStyle.css';

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.spotifyStates.userInfo,
    }
    console.log(this.props.spotifyStates);
  }

  sideBarItemListener(selectedScreen) {
    this.props.setState({selectedScreen: selectedScreen});
  }

  render() {
    return (
      <div className="sideBar">
        <div id="sideBarUserInfo">
          <div id="userImage">
            <img src={this.state.userInfo.images.length == 0 ? '../../img/blankUserImage.png' : this.state.userInfo.images[0].url} alt="User Profile Image"></img>
          </div>
          <h4>{this.state.userInfo.type}</h4>
          <h2>{this.state.userInfo.display_name}</h2>
          
        </div>
        <div className="sideBarItem" onClick={() => {this.sideBarItemListener("yourSpotify")}}>
          <p>Your Spotify</p>
        </div>
        <div className="sideBarItem" onClick={() => {this.sideBarItemListener("statistics")}}>
          <p>Statistics</p>
        </div>
      </div>
    )
  }
}