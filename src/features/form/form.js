// @flow

import React, { Component } from 'react';
import Deepomatic from 'helpers/deepomatic/client.js';
import type { Task } from 'helpers/deepomatic/client.js';
import { encodeFileToBase64 } from 'utils/file.js';
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

  handleSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();
    const { file } = this.state;
    this.setState({ uploading: true });
    Deepomatic.submitFile(file).then(
      taskId => {
        this.setState({ polling: true });
        Deepomatic.retrieveTaskResults(taskId).then((task: Task) => {
          this.setState({ polling: false, uploading: false });
          this.setState({ task });
        });
      },
      error => {
        this.setState({ error });
      }
    );
  };

  handleChange = (event: SyntheticInputEvent<>) => {
    const file = event.target.files[0];
    this.setState({ task: undefined });
    encodeFileToBase64(file).then((encodedFile: string) => {
      this.setState({
        file: encodedFile,
      });
    });
  };

  renderCallStatus() {
    const { polling, uploading } = this.state;
    return (
      (polling || uploading) && (
        <div className="CallStatus">
          {uploading && <p>Uploading file...</p>}
          {polling && <p>Waiting for results...</p>}
        </div>
      )
    );
  }

  renderResults() {
    const { task } = this.state;
    if (!task) {
      return;
    } else {
      return (
        <div className="Results">
          <h2 className="Results__Title">
            We found the following items on your image:
          </h2>
          {Object.keys(task.data.boxes).map(key => (
            <p className="Results__Item" key={key}>
              {key}
            </p>
          ))}
        </div>
      );
    }
  }

  render() {
    const { error } = this.state;
    return (
      <form className="Form" onSubmit={this.handleSubmit}>
        <div className="Input">
          <label className="Input__Label">Your file</label>
          <input type="file" onChange={this.handleChange} />
          <p className="Input__ErrorMessage">{error}</p>
        </div>
        <button className="Button">Describe</button>
        {this.renderCallStatus()}
        {this.renderResults()}
      </form>
    );
  }
}

export default Form;
