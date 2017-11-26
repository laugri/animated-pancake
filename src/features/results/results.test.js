import React from 'react';
import { shallow } from 'enzyme';
import Results from './Results';

describe('<Results/>', () => {
  test('renders without crashing', () => {
    shallow(<Results boxes={{}} />);
  });

  test('should display no-results disclaimer', () => {
    const wrapper = shallow(<Results boxes={{}} />);
    expect(wrapper.find('.Results__ItemList').exists()).toBe(false);
    expect(wrapper.find('.Results__Title').text()).toEqual(
      'We found no item in you image.'
    );
  });

  test('should display form and and results', () => {
    const wrapper = shallow(<Results boxes={{ shirt: {} }} />);
    expect(wrapper.find('.Results__ItemList').exists()).toBe(true);
    expect(wrapper.find('.Results__Title').text()).toEqual(
      'We found the following items on your image:'
    );
  });
});
