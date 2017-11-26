// @flow

import React, { Component } from 'react';
import { replaceAll } from 'utils/string.js';
import './results.css';

type Props = {
  boxes: Object,
};
type State = void;

class Results extends Component<Props, State> {
  render() {
    const { boxes } = this.props;
    const items = Object.keys(boxes);
    if (items.length === 0) {
      return (
        <div className="Results">
          <h2 className="Results__Title">We found no item in you image.</h2>
        </div>
      );
    } else {
      return (
        <div className="Results">
          <h2 className="Results__Title">
            We found the following items on your image:
          </h2>
          <ul className="Results__ItemList">
            {items.map(key => (
              <li className="Results__Item" key={key}>
                {replaceAll(key, '-', ' ')}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Results;
