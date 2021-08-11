import React, { Component, PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CatersianGrid, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

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

    //for localhost testing
    if(this.mounted){
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events)
          });
        }
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift()
      return { city, number};
    });
    
    return data;
  }

  render() {
    
    //comment this out for local testing
    /*if (this.state.showWelcomeScreen)
      return <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />*/
    
    return (
      <Container className="App">
        <Row className="app-inner-wrapper">
          <Col>
            <Header></Header>
            <WarningAlert text={this.state.infoText} />
            <CitySearch locations={ this.state.locations } updateEvents={ this.updateEvents } />
            <NumberofEvents eventCount={this.state.numberofEvents} updateTotalEvents={ this.updateTotalEvents }/>
            
            <h4>Events in each city</h4>
            <ResponsiveContainer height={400}>
              <ScatterChart margin={{ top: 20, right:20, bottom: 20, left: 20}} >
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="city" />
                <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3'}} />
                <Scatter data={ this.getData() } fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>

            <EventList events={ this.state.events } currentLocation={this.state.currentLocation} />
          </Col>
        </Row>
      </Container>
    )
  }

}

export default App;