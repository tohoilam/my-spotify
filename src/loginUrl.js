// https://developer.spotify.com/
// GET to https://accounts.spotify.com/authorize
// Required Parameter: client_id, response_type: 'code', redirect_uri
// Optional Parameter: state, scope, show_dialog

const endpoint = 'https://accounts.spotify.com/authorize'
const client_id = '7d923655f9054c0b9b47b6b2be615b01';
const response_type = 'token';
const redirect_uri = 'http://localhost:3000/';

const scope = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)  //remove the hashtag in front (at string 0)
    .split('&')   //turn into an array, split at &
    .reduce((initial, current) => {
      let param = current.split('=');
      initial[param[0]] = decodeURIComponent(param[1]);

      return initial;
    }, {});
};

export const loginUrl = `${endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope.join("%20")}&show_dialog=true`;
