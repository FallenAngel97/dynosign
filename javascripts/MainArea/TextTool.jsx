import React from 'react';
import { connect } from 'react-redux';
import './TextTool.scss';

export class TextTool extends React.Component {
  constructor (props) {
    super(props);
    this.addText = this.addText.bind(this);
  }
  addText (ev) {
    const x = ev.clientX - this.textWrapper.offsetLeft;
    const y = ev.clientY - this.textWrapper.offsetTop;
    let input = document.createElement('input');
    input.style.cssText = `position: absolute; left: ${x}px; top: ${y}px`;
    document.getElementById('text_tool_drawing_area').appendChild(input);
    input.focus()
  }
  render () {
    return (
      <div ref={textWrapper => { this.textWrapper = textWrapper }} onClick={this.addText} id='text_tool_drawing_area'>
      </div>
    )
  };
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(TextTool);
