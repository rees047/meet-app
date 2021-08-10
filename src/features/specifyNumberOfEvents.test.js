import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';

import App from '../App';
import NumberofEvents from '../NumberofEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => { //start declaring empty and jest-cucumber will give you the test scenarios after initial testing

    test('On initial page load, 32 is set as the default number of events', ({ given, when, then }) => {
        let eventCount = 32;
        let NumberofEventsWrapper;

        given('on initial page load', () => {
            NumberofEventsWrapper = shallow(<NumberofEvents eventCount={eventCount} updateTotalEvents={() => {}} />);
        });

        when('the user opens the app', () => {
            let AppWrapper = mount(<App />);
        });

        then(/^the number of events is (\d+) by default$/, (arg0) => {
            expect(NumberofEventsWrapper.find('.numberofEventsInput').prop('value')).toBe(eventCount);
        });
    });


    test('When user changes the input, the number of events shown is updated according to user input', ({ given, when, then }) => {
        let eventCount = 32;
        let NumberofEventsWrapper;
        
        given('user sees the number of events textbox', () => {
            NumberofEventsWrapper = shallow(<NumberofEvents eventCount={eventCount} updateTotalEvents={() => {}} />);
            expect(NumberofEventsWrapper.find('.numberofEventsInput')).toHaveLength(1);
        });

        when('the user changes the number of events', () => {
            NumberofEventsWrapper.setState({
                numberofEvents: '4'
            });
            
            const eventObject = { target: {value: '8'}};        
            NumberofEventsWrapper.find('.numberofEventsInput').simulate('change', eventObject);
        });

        then('the number of events changes according to user input', () => {
            expect(NumberofEventsWrapper.state('numberofEvents')).toBe('8');
        });
    });

    test('If user input is greater than 32, less than 1 or is not a number, the default 32 events is listed as the number of events', ({ given, when, then }) => {
        let eventCount = 32;
        let NumberofEventsWrapper;
        
        given('user sees the number of events textbox', () => {
            NumberofEventsWrapper = shallow(<NumberofEvents eventCount={eventCount} updateTotalEvents={() => {}} />);
            expect(NumberofEventsWrapper.find('.numberofEventsInput')).toHaveLength(1);
        });

        when(/^the user inputs greater than (\d+), less than (\d+) or is not a number$/, (arg0, arg1) => {
            NumberofEventsWrapper.setState({
                numberofEvents: '8',
                invalid: false
            });
            
            const eventObject = { target: {value: 'a'}};        
            NumberofEventsWrapper.find('.numberofEventsInput').simulate('change', eventObject);
        });

        then('error message is displayed', () => {
            expect(NumberofEventsWrapper.state('invalid')).toBe(true);
        });
    });

});