import React from 'react';
import './TopBar.scss';
import collapse from './collapse.svg';
import expand from './expand.svg';
import close from './close.svg';
import { toggleMenuBar } from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * The very top bar, which conatins title, and minimize-maximize-close buttons
 * @module TopBar
 */

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
  /**
   * Closes the submenu popup, if clicked outside
   * @param {MouseEvent} ev - necessary to detect the click target
   */
  handleClick (ev) {
    if (document.getElementsByClassName('menuActionPanel').length === 0) return;
    if (!document.getElementsByClassName('menuActionPanel')[0].contains(ev.target)) {
      this.props._toggleMenuBar(-1)
    }
  }
  /**
   * Minimizes window
   */
  minimizeWindow () {
    this.window.minimize();
  }
  /**
   * Maximizes window
   */
  maximizeWindow () {
    this.window.isMaximized() ? this.window.unmaximize() : this.window.maximize()
  }
  /**
   * Closes window
   */
  closeWindow () {
    this.window.close();
  }
  render () {
    return (
      <header>
        <nav>
          <div className={this.props.toggleMenuBar.menuBarNumber === 1 ? 'activeMenuBar' : ''} onClick={() => this.props._toggleMenuBar(1)}>File</div>
          <div className={this.props.toggleMenuBar.menuBarNumber === 2 ? 'activeMenuBar' : ''} onClick={() => this.props._toggleMenuBar(2)}>Edit</div>
          <div>Help</div>
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
  _toggleMenuBar: PropTypes.func,
  toggleMenuBar: PropTypes.object
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    _toggleMenuBar: (menuBarNumber) => dispatch(toggleMenuBar(menuBarNumber))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
