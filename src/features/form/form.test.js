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

  describe('.handleSubmit()', () => {
    test('should display error with no file in state', () => {
      const instance = shallow(<Form />).instance();
      instance.setState({ task: mockTask });
      const event = { preventDefault: jest.fn() };
      instance.handleSubmit({}, event);
      expect(event.preventDefault).toBeCalled();
      expect(instance.state).toEqual({
        file: '',
        error: 'No file was selected for upload',
        task: undefined,
        uploading: false,
        polling: false,
      });
    });

    test('should call the client when a file is provided', () => {
      const instance = shallow(<Form />).instance();
      instance.setState({ file: 'data:image/png;base64,file' });

      const event = { preventDefault: jest.fn() };
      const client = {
        submitFile: jest.fn(() => Promise.resolve('taskId')),
        retrieveTaskResults: jest.fn(() => Promise.resolve(mockTask)),
      };

      instance.handleSubmit(client, event).then(() => {
        expect(client.submitFile).toHaveBeenCalledWith('file');
        expect(client.retrieveTaskResults).toHaveBeenCalledWith('taskId');
        expect(instance.state).toEqual({
          file: 'data:image/png;base64,file',
          error: '',
          task: mockTask,
          uploading: false,
          polling: false,
        });
      });
    });
  });
});
