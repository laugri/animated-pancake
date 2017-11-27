// @flow

import React, { Component } from 'react';
import { replaceAll } from 'utils/string.js';
import './boxedimage.css';

type Props = {
  boxes: Object,
  file: ?string,
};
type State = void;
type Box = {
  proba: number,
  xmax: number,
  xmin: number,
  ymax: number,
  ymin: number,
};
type ExtendedBox = Box & { type: string };
type Boxes = { [string]: Array<Box> };

export function flattenBoxes(boxes: Boxes): Array<ExtendedBox> {
  const flattened = [];
  for (const itemType of Object.keys(boxes)) {
    const items = boxes[itemType];
    for (const item of items) {
      flattened.push({ ...item, type: itemType });
    }
  }
  return flattened;
}

export function computeBoxStyle(
  box: Box
): { top: string, left: string, width: string, height: string } {
  return {
    top: `${box.ymin * 100}%`,
    left: `${box.xmin * 100}%`,
    width: `${(box.xmax - box.xmin) * 100}%`,
    height: `${(box.ymax - box.ymin) * 100}%`,
  };
}

class BoxedImage extends Component<Props, State> {
  render() {
    const { boxes, file } = this.props;
    const itemTypes = Object.keys(boxes);
    if (itemTypes.length === 0) {
      return null;
    } else {
      const drawnBoxes = flattenBoxes(boxes).map((box: ExtendedBox) => {
        return (
          <div
            key={JSON.stringify(box)}
            className="Box"
            style={computeBoxStyle(box)}
          >
            <span className="Box__Label">{replaceAll(box.type, '-', ' ')}</span>
          </div>
        );
      });

      return (
        <div className="BoxedImage">
          <img src={file} alt="preview" className="Image" />
          {drawnBoxes}
        </div>
      );
    }
  }
}

export default BoxedImage;
