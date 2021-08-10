// src/CitySearch.js

import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

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
       
        return (
            <Row className="NumberofEvents">
                <Col md={{span: 6, offset: 3}} lg={{span: 4, offset: 4}}>
                    <br/>
                    <Form>
                        <Form.Label>Number of Events: </Form.Label>
                        <Form.Control
                            type="text"
                            className="numberofEventsInput"
                            value={numberofEvents}
                            onChange={this.handleInputChanged}
                        />
                        <Form.Text className="text-muted">
                           Please enter a value from 1-32.
                        </Form.Text>
                    </Form>
                    <p className="error-msg">
                        <small>{ (invalid) ? 'Input is Invalid' : <br/> }</small>
                        <small>{ (invalid) ? 'Currently displaying last valid value' : <br/> }</small><br/>
                    </p>
                </Col>
            </Row>
        )
    }

}

export default NumberofEvents