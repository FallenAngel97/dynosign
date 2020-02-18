import React from 'react'
import Select from 'react-select';
import { withLocalize } from 'react-localize-redux';
const { ipcRenderer } = require('electron');

const options = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Русский' },
  { value: 'ua', label: 'Українська' }
];
let index = options.findIndex((option) => {
  return option.value === window.language
});

class LanguageChangePage extends React.Component {
  state = {
    selectedLanguage: options[index]
  }
  changeLanguage = (lang) => {
    this.setState({ selectedLanguage: lang });
  }
  saveLanguagePreference = () => {
    ipcRenderer.send('change-language', this.state.selectedLanguage);
    this.props.setActiveLanguage(this.state.selectedLanguage.value);
    window.language = this.state.selectedLanguage.value;
  }
  render () {
    return (
      <div>
        <Select
          onChange={this.changeLanguage}
          value={this.state.selectedLanguage}
          options={options} />
        <button onClick={ this.saveLanguagePreference }>Save</button>
      </div>
    )
  }
}

export default withLocalize(LanguageChangePage);
