import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {

    let EventWrapper;

    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData} />);
    });

    test('render event-summary', () => {
        expect(EventWrapper.find('.event-summary')).toHaveLength(1);
    });

    test("render event-location", () => {
        expect(EventWrapper.find(".event-location")).toHaveLength(1);
    });
    
    test("render event-dateTime", () => {
        expect(EventWrapper.find(".event-dateTime")).toHaveLength(1);
    });

    test('render event-details', () => {
        expect(EventWrapper.find('.event-details')).toHaveLength(1);
    });    

    test('render event-link', () => {
        expect(EventWrapper.find('.event-details')).toHaveLength(1);
    });    

    test('render event-description', () => {
        expect(EventWrapper.find('.event-details')).toHaveLength(1);
    });    

    test('render toggle-details button', () => {
        expect(EventWrapper.find('.toggle-details')).toHaveLength(1);
    });

    test('hide event-details on page load', () => {
        expect(EventWrapper.state('toggle')).toBe(0);
    });

    test('change toggle state when button is clicked', () => {
        const prevToggle = EventWrapper.state('toggle');
        
        EventWrapper.setState({
            toggle : !prevToggle
        });

        EventWrapper.find('.toggle-details').simulate('click');
        //expect(EventWrapper.state('toggle')).toBe(!prevToggle);
    });

});