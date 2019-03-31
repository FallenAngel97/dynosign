'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class SettingsPage extends React.Component {
  render () {
    return (
      <div>
        Settings
      </div>
    )
  }
}

ReactDOM.render(<SettingsPage />, document.getElementsByTagName('body')[0]);
