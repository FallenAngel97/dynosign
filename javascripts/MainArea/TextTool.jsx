import React from 'react';
import { connect } from 'react-redux';
import './TextTool.scss';
import PropTypes from 'prop-types';

export class TextTool extends React.Component {
  constructor (props) {
    super(props);
    this.addText = this.addText.bind(this);
  }
  addText (ev) {
    const input = document.getElementById('text_tool_input');
    if (input.contains(ev.target)) return;
    const x = ev.clientX - this.textWrapper.offsetLeft;
    const y = ev.clientY - this.textWrapper.offsetTop;
    input.style.cssText = `display: block; left: ${x}px; top: ${y}px`;
    input.focus()
  }
  componentWillUnmount () {
    // Save text logic
  }
  render () {
    return (
      <div ref={textWrapper => { this.textWrapper = textWrapper }} onClick={this.addText} id='text_tool_drawing_area'>
        <input style={{ fontFamily: this.props.changeFont.font.label }} id='text_tool_input' type='text' />
      </div>
    )
  };
}

TextTool.propTypes = {
  changeFont: PropTypes.object
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(TextTool);
