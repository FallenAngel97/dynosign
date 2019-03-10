import React from 'react';
import './TopBar.scss';
import collapse from './collapse.svg';
import expand from './expand.svg';
import close from './close.svg';
import { toggleMenuBar } from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const remote = require('electron').remote;

class TopBar extends React.Component {
  constructor (props) {
    super(props);
    this.window = remote.getCurrentWindow();
    this.minimizeWindow = this.minimizeWindow.bind(this);
    this.maximizeWindow = this.maximizeWindow.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }
  UNSAFE_componentWillMount () {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  handleClick (ev) {
    if (!document.getElementsByClassName('menuActionPanel')[0].contains(ev.target)) {
      this.props._toggleMenuBar(false)
    }
  }
  minimizeWindow () {
    this.window.minimize();
  }
  maximizeWindow () {
    this.window.isMaximized() ? this.window.unmaximize() : this.window.maximize()
  }
  closeWindow () {
    this.window.close();
  }
  render () {
    return (
      <header>
        <nav>
          <span onClick={() => this.props._toggleMenuBar(true)}>File</span>
          <span onClick={() => this.props._toggleMenuBar(true)}>Edit</span>
          <span>Help</span>
        </nav>
        <div id='title'>DynoSign</div>
        <div id='controlButtons'>
          <img onClick={this.minimizeWindow} style={{ verticalAlign: 'bottom' }} src={collapse} />
          <img src={expand} onClick={this.maximizeWindow} />
          <img src={close} onClick={this.closeWindow} />
        </div>
      </header>
    )
  }
}

TopBar.propTypes = {
  _toggleMenuBar: PropTypes.func
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    _toggleMenuBar: (visible) => dispatch(toggleMenuBar(visible))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
