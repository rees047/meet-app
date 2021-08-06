import React from 'react';
import { shallow } from 'enzyme';
import NumberofEvents from '../NumberofEvents';

describe('<NumberofEvents /> component', () => {

    let NumberofEventsWrapper;

    beforeAll(() => {
        let eventCount = 32;
        NumberofEventsWrapper = shallow(<NumberofEvents eventCount={eventCount} updateTotalEvents={() => {}} />);
    });

    test('render text input', () => {
        expect(NumberofEventsWrapper.find('.numberofEventsInput')).toHaveLength(1);
    });

    test('renders text input correctly', () => {
        const numberofEvents = NumberofEventsWrapper.state('numberofEvents');
        expect(NumberofEventsWrapper.find('.numberofEventsInput').prop('value')).toBe(numberofEvents);
    });  

    test('renders text input with 32 as default value', () => {
        expect(NumberofEventsWrapper.find('.numberofEventsInput').prop('value')).toBe(32);
    });

    test('change state when text input changes', () => {
        NumberofEventsWrapper.setState({
            numberofEvents: '4'
        });
        
        const eventObject = { target: {value: '8'}};        
        NumberofEventsWrapper.find('.numberofEventsInput').simulate('change', eventObject);
        expect(NumberofEventsWrapper.state('numberofEvents')).toBe('8');        
    }); 

});