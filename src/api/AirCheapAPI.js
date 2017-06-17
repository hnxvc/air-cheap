import 'whatwg-fetch';
import AirportActions from '../actions/AirportActions';

let AirCheapAPI = {
  fetchAirports() {
    fetch('airports.json')
    .then(result => {
      console.log('REMOVEME --- json', result.json());
      return result
    })
    .then(result => {
      return AirportActions.fetchAirportsSuccess(result);
    })
    .catch(err => {
      return AirportActions.fetchAirportsError(err)
    })
  }
}

export default AirCheapAPI;
