import 'whatwg-fetch';
import AirportActions from '../actions/AirportActions';

let AirCheapAPI = {
  fetchAirports(successCallback, errorCallback) {
    fetch('https://api.github.com/users/midigamo')
    .then(response => {
      return response.json()
    })
    .then(response => {
      return successCallback(response);
    })
    .catch(err => {
      return errorCallback(err);
    })
  }
}

export default AirCheapAPI;
