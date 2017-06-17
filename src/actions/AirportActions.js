import AppDispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/AirCheapAPI';


let AirportActions = {
  fetchAirports() {
    AirCheapAPI.fetchAirports();
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS
    });
  },

  fetchAirportsSuccess(response) {
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_SUCCESS,
      payload: { response }
    });
  },

  fetchAirportsError(error) {
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_ERROR,
      payload: { error }
    });
  }
}

export default AirportActions;
