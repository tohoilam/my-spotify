import React from 'react';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPlaylists: this.props.spotifyStates.userPlaylists,
    }
  }

  render() {
    console.log(this.state.userPlaylists);
    return (
      <div>
        Overview
        {this.state.userPlaylists.items ? this.state.userPlaylists.items.map((item) => <p>{item.name}</p>) : ""}
      </div>
    )
  }
}