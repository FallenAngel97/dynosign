import React from 'react';
import './RectangleSettings.scss';

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
