import React, { Component } from "react";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './Event.css';

class Event extends Component {

  constructor(){
    super();    
    this.state = {
      toggle : 0,
      forTesting: false
    }
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  toggleDetails(){
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
  }

  refineDate(longDate){
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

    let date = new Date(longDate);
    let year = date.getFullYear();
    let month = date.getMonth();
    let dt = date.getDate();
    let exactTimeZone = longDate.split("T");
    let exactTime = (exactTimeZone[1].match(/.{1,8}/g));

    if (dt < 10) {
      dt = '0' + dt;
    }

    /*if (month < 10) {
        month = '0' + month;
    }*/
    
    return weekdays[date.getDay()] + ' ' + monthNames[month] + ' ' + dt  + ' ' + year + ' ' + exactTime[0] + ' GMT' + exactTime[1];
    
    //console.log(year+'-' + month + '-'+dt);
  }    

  render() {
    const { event } = this.props;   
    let showHide = (this.state.toggle) ? "show" : "hide";
    let showHideText = (this.state.toggle) ? "Hide Details" : "More Details";

    return (
      <Card id = { event.id } className="event">
        <Card.Body className="event-preview">
          <Card.Title className="event-summary">{event.summary}</Card.Title>
          <Card.Subtitle className="event-dateTime">{this.refineDate(event.start.dateTime)} ({event.start.timeZone})</Card.Subtitle> 
          <Card.Text className="event-location">@{event.summary} | {event.location}</Card.Text>
          <Button variant="info" className="toggle-details" onClick={this.toggleDetails}>{showHideText}</Button>
          <Card.Text className={ `event-details ${showHide}` }>
            <Card.Link href={event.htmlLink} target="blank" title={event.summary} className="event-link">{event.summary}</Card.Link>
            <Card.Text className="event-description">{event.description}</Card.Text>            
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
  
}

export default Event;