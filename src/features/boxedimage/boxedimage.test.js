// @flow

import React from 'react';
import { shallow } from 'enzyme';
import BoxedImage, { flattenBoxes, computeBoxStyle } from './boxedimage';

describe('<BoxedImage/>', () => {
  const mockBoxes = {
    'light-jacket': [
      {
        proba: 1,
        xmax: 1,
        xmin: 0,
        ymax: 1,
        ymin: 0,
      },
      {
        proba: 0.9,
        xmax: 0.9,
        xmin: 0.1,
        ymax: 0.9,
        ymin: 0.1,
      },
    ],
    pants: [
      {
        proba: 1,
        xmax: 1,
        xmin: 0,
        ymax: 1,
        ymin: 0,
      },
    ],
  };

  describe('display', () => {
    test('renders without crashing', () => {
      shallow(<BoxedImage boxes={{}} file="" />);
    });

    test('should not display anything if no boxes and no file are provided', () => {
      const wrapper = shallow(<BoxedImage boxes={{}} file="" />);
      expect(wrapper.find('.BoxedImage').exists()).toBe(false);
    });

    test('should display an image and 3 boxes', () => {
      const wrapper = shallow(<BoxedImage boxes={mockBoxes} file="a-file" />);
      expect(wrapper.find('.BoxedImage').exists()).toBe(true);
      expect(wrapper.find('.Image').exists()).toBe(true);
      expect(wrapper.find('.Box').exists()).toBe(true);
      expect(wrapper.find('.BoxedImage').children()).toHaveLength(4);
    });
  });

  describe('flattenBoxes', () => {
    test('should flatten boxes object into an array of boxes with label', () => {
      expect(flattenBoxes(mockBoxes)).toEqual([
        {
          proba: 1,
          xmax: 1,
          xmin: 0,
          ymax: 1,
          ymin: 0,
          type: 'light-jacket',
        },
        {
          proba: 0.9,
          xmax: 0.9,
          xmin: 0.1,
          ymax: 0.9,
          ymin: 0.1,
          type: 'light-jacket',
        },
        {
          proba: 1,
          xmax: 1,
          xmin: 0,
          ymax: 1,
          ymin: 0,
          type: 'pants',
        },
      ]);
    });
  });

  describe('computeBoxStyle', () => {
    const mockBox = {
      proba: 0.9,
      xmax: 0.7,
      xmin: 0.1,
      ymax: 0.8,
      ymin: 0.3,
    };
    test('should return react style pseudo-css object', () => {
      expect(computeBoxStyle(mockBox)).toEqual({
        top: '30%',
        left: '10%',
        width: '60%',
        height: '50%',
      });
    });
  });
});
