// @flow

import React, { Component } from 'react';
import './App.css';

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
          <form className="App__Card__Content">
            <div className="Input">
              <label>Your file</label>
              <input type="file" />
            </div>
            <button className="Button">Describe</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
