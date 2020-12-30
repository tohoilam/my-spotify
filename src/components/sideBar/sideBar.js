import React from 'react';
import './sideBarStyle.css';

export default class SideBar extends React.Component {

  sideBarItemListener(selectedScreen) {
    this.props.setState({selectedScreen: selectedScreen});
  }

  render() {
    return (
      <div className="sideBar">
        <div className="sideBarItem" onClick={() => {this.sideBarItemListener("yourSpotify")}}>Your Spotify</div>
        <div className="sideBarItem" onClick={() => {this.sideBarItemListener("statistics")}}>Statistics</div>
      </div>
    )
  }
}