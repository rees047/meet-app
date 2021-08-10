import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';

import App from '../App';
import EventList from '../EventList';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => { //start declaring empty and jest-cucumber will give you the test scenarios after initial testing

    test('On initial page load, the event details are hidden by default', ({ given, when, then }) => {
        let EventWrapper;
        
        given('on initial page load', () => {
            EventWrapper = shallow(<Event event={ mockData[0] } />)
        });

        when('the user opens the app', () => {
            let AppWrapper = mount(<App />);
        });

        then('the event details are hidden by default', () => {
            expect(EventWrapper.state('.toggle')).toBeFalsy();
        });
    
    });

    test('When the user clicks on MORE DETAILS, the event details are displayed', ({ given, when, then }) => {
        let EventWrapper;

        given('user sees the MORE details button', () => {
            EventWrapper = shallow(<Event event={ mockData[0] } />)
            expect(EventWrapper.find('.toggle-details')).toHaveLength(1);
        });

        when('the user clicks on MORE details', () => {
            EventWrapper.find('.toggle-details').at(0).simulate('click');
        });

        then('the event details are displayed', () => {
            expect(EventWrapper.state('toggle')).toBeTruthy();
        });
    });

    test('When the user clicks on HIDE DETAILS, the event details are hidden', ({ given, when, then }) => {
        let EventWrapper;

        given('user sees the HIDE details button', () => {
            EventWrapper = shallow(<Event event={ mockData[0] } />)
            EventWrapper.setState({ 'toggle' : 1});
            expect(EventWrapper.find('.toggle-details')).toHaveLength(1);
        });

        when('the user clicks on HIDE details', () => {
            EventWrapper.find('.toggle-details').at(0).simulate('click');
        });

        then('the event details are hidden', () => {
            expect(EventWrapper.state('toggle')).toBeFalsy();
        });
    });

});