import React, { Component } from "react";

class Event extends Component {

  state = {
    toggle : 0
  }

  toggleDetails(){
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
  }

  render() {
    const { event } = this.props;
    let showHide;
    return (
      <div id = { event.id} className="event" >
        <div className="event-preview">
          <div className="event-summary"></div>
          <div className="event-location"></div>
          <div className="event-dateTime"></div>
        </div>
        <button className="toggle-details"></button>
        { showHide = (this.state.toggle) ? "show" : "hide" }
          <div className="event-details {`showHide`}"></div>
      </div>
    )
  }
  
}

export default Event;