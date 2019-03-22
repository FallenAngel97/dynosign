import React from 'react';
import './RectangleSettings.scss';

/**
 * defines the common figures propertis. Offset, height, width.
 * @module RectangleSettings
 */

export default class RectangleSettings extends React.Component {
  render () {
    return (
      <div id='rectangle_settings'>
        Left: <input />
        Top: <input />
        Height: <input />
        Width: <input />
      </div>
    )
  }
}
