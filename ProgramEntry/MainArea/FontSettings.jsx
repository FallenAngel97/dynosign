import React from 'react'
import PropTypes from 'prop-types';
import Select from 'react-select';
import { ipcRenderer } from 'electron'
import { connect } from 'react-redux';
import { changeFonts } from '../actions';

/**
 * @module FontSettings
 */

const fonts = ipcRenderer.sendSync('getfonts', 'ping');

export class FontSettings extends React.Component {
  state = {
    fontSize: 10
  }

  options = fonts.map((font) => {
    return { value: font, label: font.family };
  });

  /**
   * Change the font for text
   * @param {object} font - Font object from OS
   */
  fontChange = (font) => {
    this.props.changeFonts(font);
  }
  changeFontSize = (event) => {
    this.setState({
      fontSize: event.target.value
    })
  }
  render () {
    return (
      <>
        <div id='fontSelector'>
          <Select onChange={this.fontChange} options={this.options} value={this.props.changeFont.font}/>
        </div>
        <input id='fontSize_picker' onChange={this.changeFontSize} value={this.state.fontSize} />
      </>
    )
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    changeFonts: (font) => dispatch(changeFonts(font))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FontSettings);

FontSettings.propTypes = {
  options: PropTypes.array,
  defaultFont: PropTypes.object,
  changeFont: PropTypes.object,
  changeFonts: PropTypes.func
}
