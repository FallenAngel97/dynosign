import React from 'react'
import PropTypes from 'prop-types';
import Select from 'react-select';
import { ipcRenderer } from 'electron'

export default class FontSettings extends React.Component {
  constructor (props) {
    super(props);
    const fonts = ipcRenderer.sendSync('getfonts', 'ping');
    this.state = {
      defaultFont: { defaultFont: { value: fonts[0], label: fonts[0].family } }
    }
    this.options = fonts.map((font) => {
      return { value: font, label: font.family };
    });
    this.fontChange = this.fontChange.bind(this)
  }
  fontChange (font) {
    this.setState({ defaultFont: font })
  }
  render () {
    return (
      <>
        <div id='fontSelector'>
          <Select onChange={this.fontChange} options={this.options} value={this.state.defaultFont}/>
        </div>
        <input id='fontSize_picker' defaultValue={10} />
      </>
    )
  }
}

FontSettings.propTypes = {
  options: PropTypes.array,
  defaultFont: PropTypes.object
}
