import React, { Component } from "react";

import './Event.css';

class Event extends Component {

  constructor(){
    super();    
    this.state = {
      toggle : 0
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
      <div id = { event.id } className="event" >
        <div className="event-preview">
          <h4 className="event-summary">{event.summary}</h4>
          <div className="event-dateTime">{this.refineDate(event.start.dateTime)} ({event.start.timeZone})</div>
          <div className="event-location">@{event.summary} | {event.location}</div>
        </div>
        <button className="toggle-details" onClick={this.toggleDetails}>{showHideText}</button>
        <div className={ `event-details ${showHide}` }>
          <div className="event-link">
            <a href={event.htmlLink} target="blank" title={event.summary}>{event.summary}</a>
          </div>
          <div className="event-description">{event.description}</div>            
        </div>
      </div>
    )
  }
  
}

export default Event;