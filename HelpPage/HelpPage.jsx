'use strict'

import React from 'react';
import ReactDOM from 'react-dom';

class HelpPage extends React.Component {
  render () {
    return (
      <div>
        Help
      </div>
    )
  }
}

ReactDOM.render(<HelpPage />, document.getElementsByTagName('body')[0])
