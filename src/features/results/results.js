// @flow

import React, { Component } from 'react';
import { replaceAll } from 'utils/string.js';
import BoxedImage from 'features/boxedimage/boxedimage.js';
import './results.css';

type Props = {
  boxes: Object,
  file: ?string,
};
type State = void;

class Results extends Component<Props, State> {
  render() {
    const { boxes, file } = this.props;
    const itemTypes = Object.keys(boxes);
    if (itemTypes.length === 0) {
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
            {itemTypes.map(key => (
              <li className="Results__Item" key={key}>
                {replaceAll(key, '-', ' ')}
              </li>
            ))}
          </ul>
          {file && <BoxedImage boxes={boxes} file={file} />}
        </div>
      );
    }
  }
}

export default Results;
