import React from 'react'
import settings from './drawing.svg';
import './PlaceHolderSettings.scss';
import { Translate } from 'react-localize-redux';

/**
 * This is the greeting screen on the right in settings window
 * @module PlaceHolderSettings
 */

export default class PlaceHolderSettings extends React.Component {
  render () {
    return (
      <div id='placeholder_settings'>
        <img src={settings} />
        <div><Translate id='settings_for_graphical_editor' /></div>
      </div>
    )
  }
}
