import React from 'react'
import Select from 'react-select';

export default class LanguageChangePage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: undefined
    }
    this.changeLanguage = this.changeLanguage.bind(this);
  }
  changeLanguage (lang) {
    this.setState({ selectedLanguage: lang });
  }
  render () {
    const options = [
      { value: 'en', label: 'English' },
      { value: 'ru', label: 'Русский' },
      { value: 'ua', label: 'Українська' }
    ];
    return (
      <div>
        <Select
          onChange={this.changeLanguage}
          value={this.state.selectedLanguage}
          options={options} />
      </div>
    )
  }
}
