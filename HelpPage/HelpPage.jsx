'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from '../TopBar/TopBar.jsx'
import PageContent from './PageContent';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../ProgramEntry/reducers';
import './HelpPage.scss';

const store = createStore(reducers);

class HelpPage extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <TopBar header={'Help'} showMenu={false} />
        <PageContent />
      </Provider>
    )
  }
}

ReactDOM.render(<HelpPage />, document.getElementsByTagName('body')[0])
