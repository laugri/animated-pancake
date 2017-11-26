import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import Results from 'features/results/results.js';

describe('<Form/>', () => {
  const mockTaskWithoutData = {
    id: 1,
    status: 'success',
    error: '',
    date_created: '',
    date_updated: '',
    data: { boxes: {}, height: 1, width: 1 },
  };

  const mockTask = {
    id: 1,
    status: 'success',
    error: '',
    date_created: '',
    date_updated: '',
    data: { boxes: { shirt: {} }, height: 1, width: 1 },
  };

  test('renders without crashing', () => {
    shallow(<Form />);
  });

  test('should only display form in default state', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.find('.CallStatus').exists()).toBe(false);
    expect(wrapper.find(Results).exists()).toBe(false);
  });

  test('should display upload status', () => {
    const wrapper = shallow(<Form />).setState({ uploading: true });
    expect(wrapper.find('.CallStatus').exists()).toBe(true);
    expect(wrapper.find('.CallStatus__Uploading').exists()).toBe(true);
    expect(wrapper.find('.CallStatus__Waiting').exists()).toBe(false);
    expect(wrapper.find(Results).exists()).toBe(false);
  });

  test('should display upload and waiting status', () => {
    const wrapper = shallow(<Form />).setState({
      uploading: true,
      polling: true,
    });
    expect(wrapper.find('.CallStatus').exists()).toBe(true);
    expect(wrapper.find('.CallStatus__Uploading').exists()).toBe(true);
    expect(wrapper.find('.CallStatus__Waiting').exists()).toBe(true);
    expect(wrapper.find(Results).exists()).toBe(false);
  });

  test('should display results component', () => {
    const wrapper = shallow(<Form />).setState({
      task: mockTaskWithoutData,
    });
    expect(wrapper.find('.CallStatus').exists()).toBe(false);
    expect(wrapper.find(Results).exists()).toBe(true);
  });

  test('should display results component', () => {
    const wrapper = shallow(<Form />).setState({
      task: mockTask,
    });
    expect(wrapper.find('.CallStatus').exists()).toBe(false);
    expect(wrapper.find(Results).exists()).toBe(true);
  });
});
