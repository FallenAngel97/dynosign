import React from 'react';
import { connect } from 'react-redux'
import LanguageChangePage from './LanguageChangePage.jsx';
import PropTypes from 'prop-types';
import ThemeChangePage from './ThemeChangePage.jsx';
import PlaceHolderSettings from './PlaceHolderSettings.jsx'

/**
 * Wrapper to display the settings entries
 * @module SettingsSection
 */

class SettingsSection extends React.Component {
  render () {
    return (
      <div id='settings_section'>
        {(() => {
          switch (this.props.settingsPage.page) {
            case 1:
              return <LanguageChangePage />
            case 2:
              return <ThemeChangePage />
            default:
              return <PlaceHolderSettings />
          }
        })()}
      </div>
    )
  }
}

SettingsSection.propTypes = {
  settingsPage: PropTypes.object
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(SettingsSection);
