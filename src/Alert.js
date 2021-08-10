import React, { Component } from 'react';

class Alert extends Component {
 
    constructor(props){
        super(props);
        this.color = null;
    }

    getStyle = () => {
        return {
            color: this.color
        };
    }

    render(){
        return (
            <div className="my-alert">
                <p style={ this.getStyle() }><small>{ this.props.text } </small></p>
            </div>
        )
    }

}

class InfoAlert extends Alert {
    
    constructor(props){
        super(props);
        this.color = 'blue';
    }

}

class WarningAlert extends Alert {
    
    constructor(props){
        super(props);
        this.color = 'orange';
    }

}

class ErrorAlert extends Alert {
    
    constructor(props){
        super(props);
        this.color = 'red';
    }

}

export { InfoAlert, WarningAlert, ErrorAlert };