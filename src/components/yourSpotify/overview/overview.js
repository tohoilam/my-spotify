import React from 'react';
import ViewPlaylists from '../../common/viewPlaylists/viewPlaylists';

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
        <ViewPlaylists playlists={this.state.userPlaylists}/>
      </div>
    )
  }
}