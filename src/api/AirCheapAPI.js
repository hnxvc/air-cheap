import 'whatwg-fetch';

let AirCheapAPI = {
  fetchAirports(successCallback, errorCallback) {
    fetch('airports.json')
    .then(response => {
      return response.json()
    })
    .then(response => {
      return successCallback(response);
    })
    .catch(err => {
      return errorCallback(err);
    })
  },

  fetchTickets(origin, destination, successCallback, errorCallback) {
    fetch('flights.json')
    .then(response => {
      return response.json();
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
