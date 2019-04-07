import React from 'react';
import './LeftPane.scss';
import { connect } from 'react-redux';
import { changeSettingsPage } from './actions';
import PropTypes from 'prop-types';

/**
 * Left pane, which shows the buttons to select the necessary settings entry
 * @module LeftPane
 */

class LeftPane extends React.Component {
  render () {
    return (
      <div id='leftpane'>
        <div onClick={() => this.props._changeSettingsPage(1)}
          className={ (this.props.page === 1 ? 'active_settings_entry ' : '') + 'settings_entry'}
          id='langChoose'>Change Language</div>
        <div onClick={() => this.props._changeSettingsPage(2)}
          className={ (this.props.page === 2 ? 'active_settings_entry ' : '') + 'settings_entry'}
          id='themeSelect'>Change theme</div>
      </div>
    )
  }
}

LeftPane.propTypes = {
  _changeSettingsPage: PropTypes.func,
  page: PropTypes.number
}

const mapStateToProps = state => state;

const mapDispathToProps = (dispatch) => {
  return {
    _changeSettingsPage: (page) => dispatch(changeSettingsPage(page))
  }
}

export default connect(mapStateToProps, mapDispathToProps)(LeftPane);
