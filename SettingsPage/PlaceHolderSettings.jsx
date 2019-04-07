import React from 'react'
import settings from './drawing.svg';
import './PlaceHolderSettings.scss';

/**
 * This is the greeting screen on the right in settings window
 * @module PlaceHolderSettings
 */

export default class PlaceHolderSettings extends React.Component {
  render () {
    return (
      <div id='placeholder_settings'>
        <img src={settings} />
        <div>Settings for your graphical editor</div>
      </div>
    )
  }
}
