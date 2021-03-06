import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { drawMarchingAnts } from './functions';

/**
 * Enables the selection box (marching ants) to be shown
 * @module SelectTool
 */

export class SelectTool extends React.Component {
  
  prevX = 0;
  prevX = 0;
  currX = 0;
  prevX = 0;
  prevY = 0;
  displaySizes = false;

  findxy = (res, e) => {
    if (this.props.changeMouseType.mouseType !== 'select') return;
    if (res === 'down') {
      this.currX = (e.clientX - this.canvas.offsetLeft) * window.devicePixelRatio;
      this.currY = (e.clientY - this.canvas.offsetTop) * window.devicePixelRatio;
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.displaySizes = true;
    }
    if (res === 'up' || res === 'out') { // hide size tooltip on mouse release
      this.displaySizes = false;
      if(this.currX == this.prevX && this.currY == this.prevY) {
        // if clicked just on the screen without dragging - then don't display marching ants
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        drawMarchingAnts(0, this.canvas);
        return;
      } else {
        drawMarchingAnts(0, this.canvas, this.displaySizes);
      }
    }
    if (res === 'move' && this.displaySizes) {
      this.currX = (e.clientX - this.canvas.offsetLeft) * window.devicePixelRatio;
      this.currY = (e.clientY - this.canvas.offsetTop) * window.devicePixelRatio;
      const currentCoordinate = { x: this.currX, y: this.currY };
      const prevCoordinate = { x: this.prevX, y: this.prevY };
      drawMarchingAnts(0, this.canvas, this.displaySizes, currentCoordinate, prevCoordinate);
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
