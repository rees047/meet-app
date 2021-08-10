//src/EventList.js

import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {

  render() {
    const { events, currentLocation } = this.props;
   
    return (
      <div>
        <p className="text-left">&nbsp;&nbsp;Showing Events From <b>{currentLocation}</b></p>
        <ul className="EventList">
          {events.map(event =>
            <li key={event.id}>
              <Event event={event} />
            </li>
          )}
        </ul>
      </div>
    );
  }
  
}

export default EventList;