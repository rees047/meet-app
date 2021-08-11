// src/CitySearch.js
import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { InfoAlert } from './Alert';

class CitySearch extends Component {

    state = {
        query : 'All Cities', //or Munich or whatever, it should still pass
        suggestions : [],
        showSuggestions: undefined,
        infoText: ''
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ showSuggestions: true });
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        
        if(suggestions.length === 0){
            this.setState({
                query: value,
                infoText: 'We cannot find the city you are looking for. Please try another city'
            });    
        }else{
            return this.setState({
                query: value,
                suggestions,
                infoText: ''
            });
        }
        
    }

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false
        })
        
        this.props.updateEvents(suggestion);
        
    }
    
    render() {
        return (
            <Row className="CitySearch">
                <Col>
                    <InfoAlert text={this.state.infoText} />
                    <br/>
                    <Form.Text className="text-muted">
                           Please start typing and choose the city from the suggestion list
                    </Form.Text>
                    <Form>
                        <Form.Control
                            type="text"
                            className="city"
                            value={ this.state.query }
                            onChange={ this.handleInputChanged }
                            onFocus={() => { this.setState({ showSuggestions: true }) }}
                        />
                    </Form>
                    <ul
                    className="suggestions"
                    style={ this.state.showSuggestions ? {} : { display: 'none' }}
                >
                    { this.state.suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>
                    ))}
                    <li key="All Cities" onClick={() =>this.handleItemClicked("All Cities")}>
                        <b>See all cities</b>
                    </li>
                </ul>
                </Col>
                
            </Row>
        )
    }

}

export default CitySearch