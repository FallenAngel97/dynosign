import React from 'react';
import './LeftPane.scss';
import { connect } from 'react-redux';
import { changeSettingsPage } from './actions';
import PropTypes from 'prop-types';
import { withLocalize, Translate } from 'react-localize-redux';

/**
 * Left pane, which shows the buttons to select the necessary settings entry
 * @module LeftPane
 */

const LeftPane = (props) => (
  <div id='leftpane'>
    <div onClick={() => props._changeSettingsPage(1)}
      className={ (props.settingsPage.page === 1 ? 'active_settings_entry ' : '') + 'settings_entry'}
      id='langChoose'><Translate id='change_language'/></div>
    <div onClick={() => props._changeSettingsPage(2)}
      className={ (props.settingsPage.page === 2 ? 'active_settings_entry ' : '') + 'settings_entry'}
      id='themeSelect'><Translate id='change_theme'/></div>
  </div>
)

LeftPane.propTypes = {
  _changeSettingsPage: PropTypes.func,
  settingsPage: PropTypes.object
}

const mapStateToProps = state => state;

const mapDispathToProps = (dispatch) => {
  return {
    _changeSettingsPage: (page) => dispatch(changeSettingsPage(page))
  }
}

export default connect(mapStateToProps, mapDispathToProps)(withLocalize(LeftPane));
