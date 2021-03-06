// @flow

import React, { Component } from 'react';
import Deepomatic from 'helpers/deepomatic/client.js';
import type { Task } from 'helpers/deepomatic/client.js';
import { encodeFileToBase64, stripBase64Type } from 'utils/file.js';
import Results from 'features/results/results.js';
import './form.css';

type Props = {};
type State = {
  file: string,
  error: string,
  task: ?Task,
  uploading: boolean,
  polling: boolean,
};

class Form extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      file: '',
      error: '',
      task: undefined,
      uploading: false,
      polling: false,
    };
  }

  handleError = (error: string) => {
    this.setState({ error, uploading: false, polling: false });
  };

  handleSubmit = (client: Object, event: SyntheticEvent<>) => {
    event.preventDefault();
    const { file } = this.state;
    this.setState({ task: undefined });
    if (!file) {
      this.setState({ error: 'No file was selected for upload' });
    } else {
      this.setState({ uploading: true });
      return client.submitFile(stripBase64Type(file)).then(taskId => {
        this.setState({ polling: true });
        return client.retrieveTaskResults(taskId).then((task: Task) => {
          this.setState({ polling: false, uploading: false, task });
        }, this.handleError);
      }, this.handleError);
    }
  };

  handleChange = (event: SyntheticInputEvent<>) => {
    const file = event.target.files[0];
    encodeFileToBase64(file).then((encodedFile: string) => {
      this.setState({
        file: encodedFile,
        error: '',
      });
    });
  };

  renderCallStatus() {
    const { polling, uploading } = this.state;
    return (
      (polling || uploading) && (
        <div className="CallStatus">
          {uploading && (
            <p className="CallStatus__Uploading">Uploading file...</p>
          )}
          {polling && (
            <p className="CallStatus__Waiting">Waiting for results...</p>
          )}
        </div>
      )
    );
  }

  render() {
    const { error, task, file } = this.state;
    return (
      <form className="Form" onSubmit={e => this.handleSubmit(Deepomatic, e)}>
        <div className="Input">
          <label className="Input__Label">Your file</label>
          <input type="file" onChange={this.handleChange} />
          <p className="Input__ErrorMessage">{error}</p>
        </div>
        <button className="Button">Describe</button>
        {this.renderCallStatus()}
        {task && <Results boxes={task.data.boxes} file={file} />}
      </form>
    );
  }
}

export default Form;
