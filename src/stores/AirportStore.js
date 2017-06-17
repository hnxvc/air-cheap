import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants';

class AirportStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch(action.type) {
      case constants.FETCH_AIRPORTS_SUCCESS:
        return action.payload.response;
      default:
        return state;
    }
  }
};

export default new AirportStore(AppDispatcher);
