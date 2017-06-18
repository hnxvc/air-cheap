import AppDispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/AirCheapAPI';


let AirportActions = {
  fetchAirports() {
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS
    });

    AirCheapAPI.fetchAirports(
      (response) => {
        AppDispatcher.dispatch({
          type: constants.FETCH_AIRPORTS_SUCCESS,
          payload: { response }
        });
      },
      (err) => {
        AppDispatcher.dispatch({
          type: constants.FETCH_AIRPORTS_ERROR,
          payload: { err }
        });
      }
    );
  }
}

export default AirportActions;
