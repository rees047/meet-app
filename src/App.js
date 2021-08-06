import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import { extractLocations, getEvents } from './api';

import './App.css';
import './nprogress.css';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberofEvents: 32
  }

  componentDidMount(){
    this.mounted = true;
    getEvents().then((events) => {
      if(this.mounted){
        this.setState({
          events,
          locations: extractLocations(events) 
        });
      }            
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      let locationEvents = (location === 'all' || location.length > 1) ? 
            events :
            events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, this.state.numberofEvents)
      })
    });
  }

  updateTotalEvents = (eventCount) => {
    this.setState({
      numberofEvents : eventCount
    });
    this.updateEvents(this.state.locations);
  }

  render() {
    return (
      <div className="App">
        <CitySearch locations={ this.state.locations } updateEvents={ this.updateEvents } />
        <NumberofEvents eventCount={this.state.numberofEvents} updateTotalEvents={ this.updateTotalEvents }/>
        <EventList events={ this.state.events } />
      </div>
    )
  }

}

export default App;