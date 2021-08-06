// src/CitySearch.js

import React, { Component } from 'react';

class NumberofEvents extends Component {

    state = {
        numberofEvents : 32, //or Munich or whatever, it should still pass
        invalid : false
    }

    handleInputChanged = (event) => {
        let value = event.target.value;

        if(isNaN(value) || value > 32){
            this.setState({
                invalid : true
            });
        }else{
            this.setState({
                numberofEvents: value,
                invalid: false
            });
    
            this.props.updateTotalEvents(value);
        }
                
    }
    
    render() {
        let { numberofEvents, invalid } = this.state;
        numberofEvents = (!numberofEvents) ? 32 : numberofEvents;
        
        return (
            <div className="NumberofEvents">
                <label>Number of Events: </label><br/>
                <p>{ (invalid) ? 'Value entered is Invalid. Displaying last valid value' : <br/>}</p>
                <input type="text" className="numberofEventsInput" value={numberofEvents} onChange={this.handleInputChanged} />
            </div>
        )
    }

}

export default NumberofEvents