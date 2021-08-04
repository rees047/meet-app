import React from 'react';
import { shallow } from 'enzyme';
import NumberofEvents from '../NumberofEvents';

describe('<NumberofEvents /> component', () => {

    let NumberofEventsWrapper;

    beforeAll(() => {
        NumberofEventsWrapper = shallow(<NumberofEvents />);
    });

    test('render text input', () => {
        expect(NumberofEventsWrapper.find('.eventNumberInput')).toHaveLength(1);
    });

    test('renders text input correctly', () => {
        const numberEventsIput = NumberofEventsWrapper.state('numberEventsInput');
        expect(NumberofEventsWrapper.find('.eventNumberInput').prop('value')).toBe(numberEventsIput);
    });  

    test('renders text input with 32 as default value', () => {
        expect(NumberofEventsWrapper.find('.eventNumberInput').prop('value')).toBe(32);
    });

    test('change state when text input changes', () => {
        NumberofEventsWrapper.setState({
            numberEventsInput: '4'
        });
        
        const eventObject = { target: {value: '8'}};        
        NumberofEventsWrapper.find('.eventNumberInput').simulate('change', eventObject);
        expect(NumberofEventsWrapper.state('numberEventsInput')).toBe('8');        
    }); 

});