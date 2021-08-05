// src/CitySearch.js

import React, { Component } from 'react';

class NumberofEvents extends Component {

    state = {
        numberEventsInput : 32 //or Munich or whatever, it should still pass
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        
        this.setState({
            numberEventsInput: value,
        });
    }
    
    render() {
        return (
            <div className="NumberofEvents">
                <label>Number of Events: </label>
                <input type="text" className="eventNumberInput" value={this.state.numberEventsInput} onChange={this.handleInputChanged} />
            </div>
        )
    }

}

export default NumberofEvents