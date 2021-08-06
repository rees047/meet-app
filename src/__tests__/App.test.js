import React from 'react';
import { shallow, mount } from 'enzyme';
import { waitFor } from "@testing-library/react";

import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberofEvents from '../NumberofEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {

    let AppWrapper;

    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render City Search', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('render Number of Events', () => {
        expect(AppWrapper.find(NumberofEvents)).toHaveLength(1);
    });

});

describe('<App /> integration', () => {

    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();    
    });

    test('App passes "locations" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        AppWrapper.setState({ numberofEvents : 4});
        const AppWrapperstateEvents = AppWrapper.state('events').slice(0, AppWrapper.state('numberofEvents'));
        expect(AppWrapperstateEvents.length).toEqual(eventsToShow.length);
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "See all cities"', async() => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    test('App passes "numberOfEvents" prop to NumberofEvents', () => {
        const AppWrapper = mount(<App />);
        const AppTotalEventsState = AppWrapper.state('numberofEvents');
        expect(AppTotalEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(NumberofEvents).props().eventCount).toEqual(AppTotalEventsState);
        AppWrapper.unmount();
    });

    test('change state when text input changes', () => {
        const AppWrapper = mount(<App />);
        AppWrapper.setState({
            numberofEvents: '4'
        });
        const eventObject = { target: {value: '8'}}; 
        const NumberofEventsWrapper = AppWrapper.find(NumberofEvents);
        NumberofEventsWrapper.find('.numberofEventsInput').simulate('change', eventObject);
        expect(AppWrapper.state('numberofEvents')).toBe('8');        
    });

    test("display number of events based on user input", async () => {
        const AppWrapper = mount(<App />);    
        AppWrapper.setState({
            numberOfEvents: '4',
            locations: 'Berlin'
        });
        const eventObject = { target: {value: '8'}};     
        const NumberofEventsWrapper = AppWrapper.find(NumberofEvents);
        NumberofEventsWrapper.find('.numberofEventsInput').simulate('change', eventObject);
        await waitFor(() => {
            AppWrapper.update();
            expect(AppWrapper.state('events').length).toBe(8);
        });
    });

});