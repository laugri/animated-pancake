// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Results from './Results';
import BoxedImage from 'features/boxedimage/boxedimage.js';

describe('<Results/>', () => {
  describe('display', () => {
    test('renders without crashing', () => {
      shallow(<Results boxes={{}} file="" />);
    });

    test('should display no-results disclaimer', () => {
      const wrapper = shallow(<Results boxes={{}} file="" />);
      expect(wrapper.find('.Results__ItemList').exists()).toBe(false);
      expect(wrapper.find('.Results__Title').text()).toEqual(
        'We found no item in you image.'
      );
    });

    test('should display form and results', () => {
      const wrapper = shallow(
        <Results boxes={{ shirt: {} }} file="not-empty" />
      );
      expect(wrapper.find('.Results__ItemList').exists()).toBe(true);
      expect(wrapper.find('.Results__Title').text()).toEqual(
        'We found the following items on your image:'
      );
      expect(wrapper.find(BoxedImage).exists()).toBe(true);
    });
  });
});
