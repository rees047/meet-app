import React, { Component } from 'react';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import Header from './Header';
import WelcomeScreen from './WelcomeScreen';
import { WarningAlert } from './Alert';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';

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
    currentLocation: 'All Cities',
    infoText: '',
    showWelcomeScreen: undefined
  }

  async componentDidMount(){
    this.mounted = true;

    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events)
          });
        }
      });
    }
    
    if(!navigator.onLine){
      this.setState({
        infoText : 'Internet Connection Not Detected. Information shown may not be recent'
      });
    }else{
      this.setState({
        infoText : ''
      });
    }

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
    
    if (this.state.showWelcomeScreen)
      return <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
    
    return (
      <Container className="App">
        <Row className="app-inner-wrapper">
          <Col>
            <Header></Header>
            <WarningAlert text={this.state.infoText} />
            <CitySearch locations={ this.state.locations } updateEvents={ this.updateEvents } />
            <NumberofEvents eventCount={this.state.numberofEvents} updateTotalEvents={ this.updateTotalEvents }/>
            <EventList events={ this.state.events } currentLocation={this.state.currentLocation} />
          </Col>
        </Row>
      </Container>
    )
  }

}

export default App;