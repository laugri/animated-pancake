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
};

class Form extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      file: '',
      error: '',
      task: undefined,
    };
  }

  handleSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();
    const { file } = this.state;
    Deepomatic.submitFile(file).then(
      taskId => {
        Deepomatic.retrieveTaskResults(taskId).then((task: Task) => {
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
    encodeFileToBase64(file).then((encodedFile: string) => {
      this.setState({
        file: encodedFile,
      });
    });
  };

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
      </form>
    );
  }
}

export default Form;
