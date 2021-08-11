import React from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
    (
        <Container className="WelcomeScreen">
            <Row className="justify-content-md-center">
                <Col lg={10} className="WelcomeScreen-inner-wrapper">
                    <div className="d-flex justify-content-center align-items-center h-500">
                        <div>             
                            <h1>Welcome to the Meet app</h1>
                            <h4>Log in to see upcoming events around the world for full-stack developers</h4>
                            <div className="button_cont" align="center">
                                <div className="google-btn">
                                    <div className="google-icon-wrapper">
                                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google sign-in" />
                                    </div>
                                    <button onClick={() => { props.getAccessToken() }} rel="nofollow noopener" class="btn-text">
                                        <b>Sign in with google</b>
                                    </button>
                                </div>
                            </div>
                            <a href="https://rees047.github.io/meet-app/privacy.html" rel="nofollow noopener"> Privacy policy </a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
    : null
}

export default WelcomeScreen;
