import React, { Component } from "react";

class Event extends Component {

  state = {
    toggle : 0
  }

  toggleDetails(){
    /*this.setState(prevState => ({
      toggle: !prevState.toggle
    }));*/
  }

  render() {
    const { event } = this.props;
    let showHide = (this.state.toggle) ? "show" : "hide";
    return (
      <div id = { event.id } className="event" >
        <div className="event-preview">
          <h4 className="event-summary">{event.summary}</h4>
          <div className="event-dateTime">dateTime</div>
          <div className="event-timeZone">TmeZone</div>
          <div className="event-location">@{event.summary} | {event.location}</div>
        </div>
        <button className="toggle-details" onClick={ this.toggleDetails() }>More Details</button>
          <div className="event-details showHide"></div>
      </div>
    )
  }
  
}

export default Event;