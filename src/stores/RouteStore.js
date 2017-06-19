import AppDispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants';
import { ReduceStore } from 'flux/utils';

class RouteStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch(action.type) {
      case constants.CHOOSE_AIRPORT:
          return {
            origin: action.origin,
            destination: action.destination,
          };
      default:
        return state;
    }
  }
}

export default new RouteStore(AppDispatcher);
