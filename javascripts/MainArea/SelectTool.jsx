import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Enables the selection box (marching ants) to be shown
 * @module SelectTool
 */

export class SelectTool extends React.Component {
  constructor (props) {
    super(props);
    this.prevX = 0;
    this.currX = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.flag = false;
    this.findxy = this.findxy.bind(this);
    this.draw = this.draw.bind(this);
    this.timerMarchingAnts = undefined;
  }
  /**
   * Draws selection box with pixel sizes on the sides
   * @param {number} offsetDash - the distance between ants
   */
  draw (offsetDash) {
    if (!this.canvas) return;
    var ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.setLineDash([6]);
    ctx.lineDashOffset = offsetDash;
    const diffX = this.currX - this.prevX;
    const diffY = this.currY - this.prevY;
    ctx.strokeRect(this.currX - diffX, this.currY - diffY, diffX, diffY);
    if (this.flag) {
      ctx.fillText(Math.abs(diffX) + 'px', this.prevX + diffX / 2, this.prevY - 10)
      ctx.fillText(Math.abs(diffY) + 'px', this.prevX - 40, this.prevY + diffY / 2)
    }
    clearTimeout(this.timerMarchingAnts)
    this.timerMarchingAnts = setTimeout(() => {
      offsetDash++;
      this.draw(offsetDash);
    }, 100);
  }
  findxy (res, e) {
    if (this.props.changeMouseType.mouseType !== 'select') return;
    if (res === 'down') {
      this.currX = (e.clientX - this.canvas.offsetLeft) * window.devicePixelRatio;
      this.currY = (e.clientY - this.canvas.offsetTop) * window.devicePixelRatio;
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.flag = true;
    }
    if (res === 'up' || res === 'out') {
      this.flag = false;
    }
    if (res === 'move') {
      if (this.flag) {
        this.currX = (e.clientX - this.canvas.offsetLeft) * window.devicePixelRatio;
        this.currY = (e.clientY - this.canvas.offsetTop) * window.devicePixelRatio;
        this.draw(0);
      }
    }
  }
  render () {
    return <canvas className='canvaslayer'
      width={this.props.width * window.devicePixelRatio}
      height={this.props.height * window.devicePixelRatio}
      style={{ width: this.props.width, height: this.props.height }}
      onMouseMove={(e) => this.findxy('move', e)}
      onMouseDown={(e) => this.findxy('down', e)}
      onMouseUp={(e) => this.findxy('up', e)}
      onMouseOut={(e) => this.findxy('out', e)}
      ref={(canvas) => { this.canvas = canvas }} />
  }
}

SelectTool.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  changeMouseType: PropTypes.object
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(SelectTool);
