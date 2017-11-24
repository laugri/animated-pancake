// @flow

import React, { Component } from 'react';
import { submitFile } from 'helpers/deepomatic.js';
import { encodeFileToBase64 } from 'utils/file.js';
import './form.css';

type Props = {};
type State = {
  file: string,
  error: string,
};

class Form extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      file: '',
      error: '',
    };
  }

  handleSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();
    const { file } = this.state;
    submitFile(file).then(
      response => {
        console.log('response', response, response.body);
      },
      error => {
        const errorMessage = error.response.body.error;
        console.warn(
          `Something went wrong when calling the API: ${errorMessage}`
        );
        this.setState({ error: errorMessage });
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
