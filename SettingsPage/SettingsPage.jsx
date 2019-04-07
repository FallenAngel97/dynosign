'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from '../TopBar/TopBar.jsx'
import LeftPane from './LeftPane';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { settingsPage } from './reducers';
import './SettingsPage.scss';
import SettingsSection from './SettingsSection.jsx';

const store = createStore(settingsPage);

/**
 * Settings popup, which allows to control the current language/theme
 * @module SettingsPage
 */

class SettingsPage extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <TopBar showMenu={false} header={'Settings'} />
        <div id='settingsContainer'>
          <LeftPane />
          <SettingsSection />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<SettingsPage />, document.getElementsByTagName('body')[0]);
