import React, { Component } from 'react';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import Header from './Header';
import { extractLocations, getEvents } from './api';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';
import './nprogress.css';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberofEvents: 32,
    currentLocation: 'All Cities'
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
      let locationEvents = (location === 'All Cities') ? 
            events :
            events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, this.state.numberofEvents),
        currentLocation : location
      })
    });
  }

  updateTotalEvents = (eventCount) => {
    this.setState({
      numberofEvents : eventCount
    });
    this.updateEvents(this.state.currentLocation);
  }

  render() {
    return (
      <Container className="App">
        <Row className="app-inner-wrapper">
          <Col>
            <Header></Header>
            <CitySearch locations={ this.state.locations } updateEvents={ this.updateEvents } />
            <NumberofEvents eventCount={this.state.numberofEvents} updateTotalEvents={ this.updateTotalEvents }/>
            <EventList events={ this.state.events } />
          </Col>
        </Row>
      </Container>
    )
  }

}

export default App;