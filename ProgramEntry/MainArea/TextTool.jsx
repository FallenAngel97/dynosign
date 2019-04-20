import React from 'react';
import { connect } from 'react-redux';
import { addTextToLayer } from '../actions';
import './TextTool.scss';
import PropTypes from 'prop-types';

/**
 * This module allows to display text box inside MainArea block
 * @module TextTool
 */

export class TextTool extends React.Component {
  constructor (props) {
    super(props);
    this.addText = this.addText.bind(this);
  }
  /**
   * Shows the text box and sets it based on the mouse coordinates
   * @param {MouseEvent} ev - necessary to detect, what is the clicked target
   */
  addText (ev) {
    const input = document.getElementById('text_tool_input');
    if (input.contains(ev.target)) return;
    const x = ev.clientX - this.textWrapper.offsetLeft;
    const y = ev.clientY - this.textWrapper.offsetTop;
    input.style.cssText = `display: block; left: ${x}px; top: ${y}px`;
    input.focus()
  }
  componentWillUnmount () {
    var textElement = this.textWrapper.getElementsByTagName('input')[0];
    if (textElement.value !== '') {
      this.props.addTextToLayer(
        textElement.value,
        textElement.style.left,
        textElement.style.top,
        this.props.changeActiveLayer.layerNumber
      );
    }
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
  changeFont: PropTypes.object,
  addTextToLayer: PropTypes.func,
  changeActiveLayer: PropTypes.object
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    addTextToLayer: (text, posX, posY, layerIndex) => dispatch(addTextToLayer({ text, posX, posY }, layerIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextTool);
