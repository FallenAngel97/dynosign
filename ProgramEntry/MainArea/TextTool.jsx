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

    this.prevX = 0;
    this.prevY = 0;
    this.currY = 0;
    this.currX = 0;
    this.mousePressed = false;
  }
  /**
   * Shows the text box and sets it based on the mouse coordinates
   * @param {MouseEvent} ev - necessary to detect, what is the clicked target
   */
  addText = (ev) => {
    const input = document.getElementById('text_tool_input');
    if (input.contains(ev.target)) return;
    const x = ev.clientX - this.textWrapper.offsetLeft;
    const y = ev.clientY - this.textWrapper.offsetTop;
    input.style.cssText = `display: block; left: ${x}px; top: ${y}px`;
    input.focus()
    this.onTextChange();
  }
  componentWillUnmount () {
    var textElement = document.getElementById('text_tool_input');
    if (textElement && textElement.innerHTML !== '') {
      console.log(textElement.innerHTML);
      this.props.addTextToLayer(
        textElement.innerHTML,
        textElement.style.left,
        textElement.style.top,
        this.props.changeActiveLayer.layerNumber
      );
    }
  }
  onTextResize = (ev, state) => {
    switch(state) {
      case 'record_motion_points':
        break;
      case 'record_end_points':
        break;
      case 'record_initial_points':
        break;
    }
    console.log(state)
    console.log(ev.clientX);
    console.log(ev.clientY);
    ev.stopPropagation();
  }
  /**
   * Changes the handlers position as user types
   */
  onTextChange = () => {
    const leftMargin = parseInt(document.getElementById('text_tool_input').style.left) - 2; // half size of resize circle
    const topMargin = parseInt(document.getElementById('text_tool_input').style.top) - 2;

    const bottomMargin = parseInt(getComputedStyle(document.getElementById('text_tool_input')).bottom) - 2;
    const rightMargin = parseInt(getComputedStyle(document.getElementById('text_tool_input')).right) - 2;
    document.getElementById('handler_top_left').style.cssText = `left: ${leftMargin}px; top: ${topMargin}px`;
    document.getElementById('handler_bottom_left').style.cssText = `left: ${leftMargin}px; bottom: ${bottomMargin}px`;
    document.getElementById('handler_top_right').style.cssText = `right: ${rightMargin}px; top: ${topMargin}px`;
    document.getElementById('handler_bottom_right').style.cssText = `right: ${rightMargin}px; bottom: ${bottomMargin}px`;
  }
  render () {
    return (
      <div ref={textWrapper => { this.textWrapper = textWrapper }} onClick={this.addText} id='text_tool_drawing_area'>
        <div onInput={this.onTextChange} style={{ fontFamily: this.props.changeFont.font.label }}
             contentEditable={true} id='text_tool_input' />
        <div onMouseMove={(ev) => this.onTextResize(ev, 'record_motion_points')}
             onMouseUp={(ev) => this.onTextResize(ev, 'record_end_points')}
             onMouseDown={(ev) => this.onTextResize(ev, 'record_initial_points')}
             className='text_handler' id='handler_top_left' />
        <div onMouseMove={(ev) => this.onTextResize(ev, 'record_motion_points')}
             onMouseUp={(ev) => this.onTextResize(ev, 'record_end_points')}
             onMouseDown={(ev) => this.onTextResize(ev, 'record_initial_points')}
             className='text_handler' id='handler_top_right' />
         <div onMouseMove={(ev) => this.onTextResize(ev, 'record_motion_points')}
             onMouseUp={(ev) => this.onTextResize(ev, 'record_end_points')}
             onMouseDown={(ev) => this.onTextResize(ev, 'record_initial_points')}
             className='text_handler' id='handler_bottom_left' />
        <div onMouseMove={(ev) => this.onTextResize(ev, 'record_motion_points')}
             onMouseUp={(ev) => this.onTextResize(ev, 'record_end_points')}
             onMouseDown={(ev) => this.onTextResize(ev, 'record_initial_points')}
             className='text_handler' id='handler_bottom_right' />
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
