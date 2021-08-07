// src/CitySearch.js
import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
  
    render() {
        return (
            <div className="bg-image" title="attribution: unsplash.com - ruslan bardash">
                <div className="mask">
                    <div className="d-flex justify-content-center align-items-center header-content">
                        <div>
                            <h1 className="mb-3">MeetMyCity</h1>
                            <h5 className="mb-4">Let the EXPLORER in you EXPERIENCE the LOCAL URBAN ADVENTURES </h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header