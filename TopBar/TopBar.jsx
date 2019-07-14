import React from 'react';
import './TopBar.scss';
import collapse from './collapse.svg';
import expand from './expand.svg';
import close from './close.svg';
import { toggleMenuBar } from '../ProgramEntry/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withLocalize, Translate } from 'react-localize-redux';
import globalTranslations from '../languagepacks/global.json';
import { renderToStaticMarkup } from 'react-dom/server';
const { ipcRenderer } = require('electron');

/**
 * The very top bar, which contains title, and minimize-maximize-close buttons
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
    this.props.initialize({
      languages: [
        { name: 'English', code: 'en' },
        { name: 'Russian', code: 'ru' },
        { name: 'Ukrainian', code: 'ua' }
      ],
      translation: globalTranslations,
      options: { renderToStaticMarkup }
    })
    this.props.setActiveLanguage(window.language);
  }
  UNSAFE_componentWillMount () {
    document.addEventListener('mousedown', this.handleClick, false);
    ipcRenderer.on('change-language', (event, lang) => {
      this.props.setActiveLanguage(lang);
      window.language = lang;
    });
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClick, false);
    ipcRenderer.removeAllListeners('change-language');
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

  /**
   * Open Help
   */
  openHelp () {
    const appUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/dist/' : '';
    window.open(appUrl + 'help.html', '_blank', 'nodeIntegration=yes');
  }

  render () {
    const { menuBarNumber } = this.props.toggleMenuBar;
    return (
      <header>
        {this.props.showMenu && <nav>
          <div className={ menuBarNumber === 1 ? 'activeMenuBar' : ''} onClick={() => this.props._toggleMenuBar(1)}><Translate id="topbar.file" /></div>
          <div className={ menuBarNumber === 2 ? 'activeMenuBar' : ''} onClick={() => this.props._toggleMenuBar(2)}><Translate id="topbar.edit" /></div>
          <div onClick={this.openHelp}><Translate id="topbar.help" /></div>
        </nav>}
        <div id='title'>{this.props.header}</div>
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
  toggleMenuBar: PropTypes.object,
  header: PropTypes.string,
  showMenu: PropTypes.bool
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    _toggleMenuBar: (menuBarNumber) => dispatch(toggleMenuBar(menuBarNumber))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLocalize(TopBar));
