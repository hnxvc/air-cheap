import React, { Component } from 'react';
import AirportStore from './stores/AirportStore';
import RouteStore from './stores/RouteStore';
import TicketStore from './stores/TicketStore';
import AirportActions from './actions/AirportActions';
import { Container } from 'flux/utils';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './App.css';
import TicketItem from './components/TicketItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airports: AirportStore.getState(),
      tickets: TicketStore.getState(),
      suggestions: TicketStore.getState(),
      from: '',
      to: ''
    };

    this.getSuggestion = this.getSuggestion.bind(this);
  }

  componentDidMount() {
    AirportActions.fetchAirports();
    AirportActions.fetchTickets();
  }


  handleSelect(field, item) {
    if(item) {
      this.setState({
        [field]: item.value
      }, () => {
        // AirportActions.chooseAirport(this.state.from, this.state.to);
        this.getSuggestion(this.state.from, this.state.to);
      });
    } else {
      this.setState({
        [field]: ''
      }, () => {
        this.getSuggestion(this.state.from, this.state.to);
        // AirportActions.chooseAirport(this.state.from, this.state.to);
      });
    }
  }

  getSuggestion(from, to) {
    let tickets = this.state.tickets;
    let suggestions = [];

    if(from && !to) {
      suggestions = tickets.filter(ticket => {
        let returned = false;
        for(var j=0; j<ticket.segment.length; j++) {
          if(ticket.segment[j].origin === from) {
            returned = true;
            break;
          }
        }
        return returned;
      });

    } else if (!from && to) {
      suggestions = tickets.filter(ticket => {
        let returned = false;
        for(var j=0; j<ticket.segment.length; j++) {
          if(ticket.segment[j].destination === to) {
            returned = true;
            break;
          }
        }
        return returned;
      });

    } else if (from && to) {
      suggestions = tickets.filter(ticket => {
        let returned = false;
        for(var j=0; j<ticket.segment.length; j++) {
          if(ticket.segment[j].origin === from && ticket.segment[j].destination === to) {
            returned = true;
            break;
          }
        }
        return returned;
      });

    } else {
      suggestions = this.state.tickets;
    }


    this.setState({
      suggestions
    });
  }

  componentWillUpdate(nextProps, nextState) {
    let originAndDestinationSelected = (nextState.origin && nextState.destination);
    let selectionHasChangedSinceLastUpdate = (nextState.origin !== this.state.origin)
      || (nextState.destination !== this.state.destination);

    if(originAndDestinationSelected && selectionHasChangedSinceLastUpdate) {
      AirportActions.fetchTickets(this.state.origin, this.state.destination);
    }
  }

  render() {
    let options = this.state.airports.map(item => {
      return Object.assign(
        {},
        { value: item.code },
        { label: item.city }
      )
    });

    let ticketList = this.state.suggestions.map((ticket)=>(
      <TicketItem key={ticket.id} ticket={ticket} />
    ));

    return (
      <div className="App">
        <header>
          <div className="header-brand">
            <img src="logo.png" height="35" alt="logo"/>
            <p>Check discount ticket prices and pay using your AirCheap points</p>
          </div>
          <div className="header-route">
            <div className="wrap-select">
              <Select
                placeholder="From"
                name="origin"
                value={this.state.from}
                options={options}
                onChange={this.handleSelect.bind(this, 'from')}
              />
            </div>
            <div className="wrap-select">
              <Select
                placeholder="To"
                name="destination"
                value={this.state.to}
                options={options}
                onChange={this.handleSelect.bind(this, 'to')}
              />
            </div>
          </div>
        </header>
        <div>
          {ticketList}
        </div>
      </div>
    );
  }
}

App.getStores = () => ([AirportStore, RouteStore, TicketStore]);
App.calculateState = (prevState) => {
  return ({
    airports: AirportStore.getState(),
    origin: RouteStore.getState().origin,
    destination: RouteStore.getState().destination,
    tickets: TicketStore.getState(),
    suggestions: TicketStore.getState()
  })
}

const AppContainer = Container.create(App);

export default AppContainer;
