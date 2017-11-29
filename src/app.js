// @flow

import React, { Component } from 'react';
import './app.css';
import Form from './features/form/form.js';

type Props = void;

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <div className="App__Card">
          <div className="App__Card__Title">
            <h1>Hi there</h1>
            <p>Chose an image you want our bot to describe.</p>
          </div>
          <Form />
        </div>
      </div>
    );
  }
}

export default App;
