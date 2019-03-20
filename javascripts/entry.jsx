'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import LeftBar from './LeftBar/LeftBar.jsx';
import MainArea from './MainArea/MainArea.jsx';
import RightPanel from './RightPanel/RightPanel.jsx';
import TopBar from './TopBar/TopBar.jsx'
import './entry.scss';
import reducers from './reducers';
import MenuActionPanel from './MenuActionPanel/MenuActionPanel.jsx';

const store = createStore(reducers);

class DynoSign extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      openedTabNumber: -1
    }
  }
  render () {
    return (
      <Provider store={store}>
        <TopBar openedTabNumber={this.state.openedTabNumber} />
        <MenuActionPanel openedTabNumber={this.state.openedTabNumber} />
        <div id='programContainer'>
          <LeftBar />
          <MainArea />
          <RightPanel />
        </div>
      </Provider>)
  }
}

ReactDOM.render(<DynoSign />, document.getElementsByTagName('body')[0]);

if (module.hot) {
  module.hot.accept()
}
