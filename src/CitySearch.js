// src/CitySearch.js
import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class CitySearch extends Component {

    state = {
        query : 'All Cities', //or Munich or whatever, it should still pass
        suggestions : [],
        showSuggestions: undefined
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        
        this.setState({
            query: value,
            suggestions
        });
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
                    <br/><br/>
                    <Form>
                        <Form.Control
                            type="text"
                            className="city"
                            value={ this.state.query }
                            onChange={ this.handleInputChanged }
                            onFocus={() => { this.setState({ showSuggestions: true }) }}

                        />
                        <Form.Text className="text-muted">
                           Please choose from the suggestion list
                        </Form.Text>
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