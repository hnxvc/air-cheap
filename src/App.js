import React, { Component } from 'react';
import './App.css';
import AirportStore from './stores/AirportStore';
import AirportActions from './actions/AirportActions';
import { Container } from 'flux/utils';
import Autosuggest from 'react-autosuggest';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airports: AirportStore.getState()
    }
  }

  componentDidMount() {
    AirportActions.fetchAirports();
  }

  render() {
    console.log('REMOVEME ---- state', this.state);
    return (
      <div className="App">
        <header>
          <div className="header-brand">
            <img src="logo.png" height="35"/>
            <p>Check discount ticket prices and pay using your AirCheap points</p>
          </div>
          <div className="header-route">
            {/* <Autosuggest id='origin' inputAttributes={{placeholder:'From'}} />
            <Autosuggest id='destination' inputAttributes={{placeholder:'To'}} /> */}
          </div>
        </header>
      </div>
    );
  }
}

App.getStores = () => ([AirportStore]);
App.calculateState = (prevState) => {
  return ({
    airports: AirportStore.getState()
  })
}

const AppContainer = Container.create(App);

export default AppContainer;
