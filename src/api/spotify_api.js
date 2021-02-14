
function SpotifyApi() {
  
}

SpotifyApi.prototype = {
  setAccessToken: function(token) {
    this.access_token = token;
  },

  getAccessToken: function() {
    return this.access_token;
  },

  request: async function(method, endpoint) {
    const requestUrl = 'https://api.spotify.com' + endpoint
    const response = await fetch(requestUrl, {
      method: method,
      headers: {
        'Authorization': 'Bearer ' + this.access_token,
        // 'Content-Type': 'application/json',
      },
    });

    const userInfo = await response.json();

    return userInfo;
  },

  getUserInfo: async function() {
    return await this.request('GET', '/v1/me');
  },

  getUserPlaylists: async function() {
    return await this.request('GET', '/v1/me/playlists');
  },

  getCurrentlyPlaying: async function() {
    const response = await this.request('GET', '/v1/me/player/currently-playing');
    if (response) {
      return response;
    }
    return {};
  },

  getCurrentPlayer: async function() {
    const response = await this.request('GET', '/v1/me/player');
    if (response) {
      return response;
    }
    return {};
  },

  getRecentlyPlayed: async function() {
    return await this.request('GET', '/v1/me/player/recently-played');
  },

  getPlaylist: async function(playlistID) {
    return await this.request('GET', '/v1/playlists/' + playlistID);
  }
};

module.exports = SpotifyApi;