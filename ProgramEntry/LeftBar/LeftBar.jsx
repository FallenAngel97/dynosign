import React, { Component } from 'react';
import moveTool from './assets/move_tool.svg'
import selectTool from './assets/select_tool.svg'
import textTool from './assets/text_tool.svg';
import drawTool from './assets/draw_tool.svg';
import circleTool from './assets/circle_tool.svg'
import rectTool from './assets/rect_tool.svg'
import './LeftBar.scss';
import { connect } from 'react-redux'
import { changeMouseType, changeColor } from '../actions';
import { SketchPicker } from 'react-color';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Left panel, which includes button to switch the tool type(move, text, rectangle, etc)
 * @module LeftBar
 */

function getIndexByMouseType(mouseType) {
  let index = 0;
  switch(mouseType) {
    case 'select':
      index = 1;
      break;
    case 'text':
      index = 2;
      break;
    case 'draw':
      index = 3;
      break;
    case 'circle':
      index = 4;
      break;
    case 'rectangle':
      index = 5;
      break;
  }
  return index;
}

export class LeftBar extends Component {
  
  state = {
    displayColorPicker: false
  }

  UNSAFE_componentWillMount () {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  /**
   * Hide Color Picker if clicked outside of it
   * @param {MouseEvent} ev - necessary to get the clicked target
   */
  handleClick = (ev) => {
    const elem = ReactDOM.findDOMNode(this.colorPicker);
    if (elem && !elem.contains(ev.target)) {
      this.setState({ displayColorPicker: false })
    }
  }
  /**
   * This method simply open's color picker
   */
  showColor = () => {
    this.setState({ displayColorPicker: true });
  }
  colorChange = (color) => {
    this.props._changeColor(color.rgb)
  };
  changeCursor = (type) => {
    this.props._changeMouseType(type);
  }
  render () {

    let index = getIndexByMouseType(this.props.changeMouseType.mouseType);

    const { color } = this.props.changeColor;
    return (
      <div id='leftBar'>
        <div title='Selection tool' className={'buttonWrapper' + ((index === 0) ? ' activeLeftButton' : '')}>
          <img onClick={() => this.changeCursor('default')} src={moveTool} className='toolsLeftPanel' />
        </div>
        <div title='Selection tool' className={'buttonWrapper' + ((index === 1) ? ' activeLeftButton' : '')}>
          <img onClick={() => this.changeCursor('select')} src={selectTool} className='toolsLeftPanel' />
        </div>
        <div title='Text tool' className={'buttonWrapper' + ((index === 2) ? ' activeLeftButton' : '')}>
          <img onClick={() => this.changeCursor('text')} src={textTool} className='toolsLeftPanel' />
        </div>
        <div title='Draw tool' className={'buttonWrapper' + ((index === 3) ? ' activeLeftButton' : '')}>
          <img onClick={() => this.changeCursor('draw')} src={drawTool} className='toolsLeftPanel' />
        </div>
        <div title='Circle tool' className={'buttonWrapper' + ((index === 4) ? ' activeLeftButton' : '')}>
          <img onClick={() => this.changeCursor('circle')} src={circleTool} className='toolsLeftPanel' />
        </div>
        <div title='Rectangle tool' className={'buttonWrapper' + ((index === 5) ? ' activeLeftButton' : '')}>
          <img onClick={() => this.changeCursor('rectangle')} src={rectTool} className='toolsLeftPanel' />
        </div>
        <div onClick={this.showColor} className='color_small_indicator'>
          <div style={{ background: `rgba(${color.r},${color.g},${color.b},${color.a})` }} />
        </div>
        {this.state.displayColorPicker && <SketchPicker ref={node => { this.colorPicker = node }} onChange={this.colorChange} color={color} className="color_picker_dynosign" />}
      </div>
    )
  }
}

LeftBar.propTypes = {
  changeColor: PropTypes.object,
  changeMouseType: PropTypes.object,
  _changeColor: PropTypes.func,
  _changeMouseType: PropTypes.func
}

const mapStateToProps = (state) => state;

export const mapDispatchToProps = (dispatch) => {
  return {
    _changeMouseType: mouseType => dispatch(changeMouseType(mouseType)),
    _changeColor: color => dispatch(changeColor(color))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
