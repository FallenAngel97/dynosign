import React from 'react';
import phoneLayout from '../MainArea/phone_layout.svg';
import desktopLayout from '../MainArea/desktop_layout.svg';
import './LayerPopupContextMenu.scss';
import PropTypes from 'prop-types';

export default class LayerPopupContextMenu extends React.Component {
  constructor (props) {
    super(props);
    this.dismissPopup = this.dismissPopup.bind(this);
  }
  componentDidMount () {
    document.addEventListener('click', this.dismissPopup, false)
  }
  componentWillUnmount () {
    document.removeEventListener('click', this.dismissPopup, false)
  }
  dismissPopup (e) {
    if (!this.node.contains(e.target)) {
      this.props.dismissPopup();
    }
  }
  render () {
    return (
      <div ref={ node => { this.node = node } } style={{ display: !this.props.hidden ? 'block' : 'none' }} id='layer_popup_contextmenu'>
        <div id='layout_context_selector'>
          <img src={phoneLayout} />
          <img src={desktopLayout} />
        </div>
        <ul>
          <li>Move up</li>
          <li>Move down</li>
          <li>Style</li>
        </ul>
      </div>
    )
  }
}
LayerPopupContextMenu.propTypes = {
  hidden: PropTypes.bool,
  dismissPopup: PropTypes.func
}
