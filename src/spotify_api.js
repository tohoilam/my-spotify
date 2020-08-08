
function SpotifyApi() {
  
}

SpotifyApi.prototype = {
  setAccessToken: function(token) {
    this.access_token = token;
  },

  getAccessToken: function() {
    return this.access_token;
  },

  fetchUser: async function() {
    const response = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.access_token,
        'Content-Type': 'application/json',
      },
    });

    const userInfo = await response.json();

    return userInfo;
  }
};

module.exports = SpotifyApi;