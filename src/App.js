import React, { Component } from 'react';
import './App.css';
import AirportStore from './stores/AirportStore';
import AirportActions from './actions/AirportActions';
import { Container } from 'flux/utils';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airports: AirportStore.getState(),
      from: '',
      to: ''
    }

    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
  }

  componentDidMount() {
    AirportActions.fetchAirports();
  }

  onChangeFrom(item) {
    if(item) {
      this.setState({
        from: item.value
      });
    } else {
      this.setState({
        from: ''
      });
    }
  }

  onChangeTo(item) {
    if(item) {
      this.setState({
        to: item.value
      });
    } else {
      this.setState({
        to: ''
      });
    }
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'From',
      value,
      onChange: this.onChange
    }

    let options = this.state.airports.map(item => {
      return Object.assign(
        {},
        { value: item.code },
        { label: item.city }
      )
    });

    return (
      <div className="App">
        <header>
          <div className="header-brand">
            <img src="logo.png" height="35"/>
            <p>Check discount ticket prices and pay using your AirCheap points</p>
          </div>
          <div className="header-route">
            <div className="wrap-select">
              <Select
                placeholder="From"
                name="origin"
                value={this.state.from}
                options={options}
                onChange={this.onChangeFrom}
              />
            </div>
            <div className="wrap-select">
              <Select
                placeholder="To"
                name="destination"
                value={this.state.to}
                options={options}
                onChange={this.onChangeTo}
              />
            </div>
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
