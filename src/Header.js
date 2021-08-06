// src/CitySearch.js
import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
  
    render() {
        return (
            <div className="bg-image">
                <div className="mask">
                    <div class="d-flex justify-content-center align-items-center header-content">
                        <div>
                            <h1 class="mb-3">MeetMyCity</h1>
                            <h5 class="mb-4">Unleash the explorer in you experience the local urban adventures </h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header