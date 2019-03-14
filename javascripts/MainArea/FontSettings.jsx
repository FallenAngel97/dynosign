import React from 'react'
import PropTypes from 'prop-types';
import Select from 'react-select';
import { ipcRenderer } from 'electron'

export default class FontSettings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      defaultFont: null
    }
    const fonts = ipcRenderer.sendSync('getfonts', 'ping');
    // this.setState({ defaultFont: { value: fonts[0], label: fonts[0].family } });
    this.options = fonts.map((font) => {
      return { value: font, label: font.family };
    });
  }
  render () {
    return (
      <>
        <div id='fontSelector'>
          <Select options={this.options} value={this.state.defaultFont}/>
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
