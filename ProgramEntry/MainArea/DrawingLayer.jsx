import React from 'react';
import { connect } from 'react-redux';
import { addLine, changeLayer, changeActiveLayer } from '../actions';
import PropTypes from 'prop-types';
import { Shape } from './Shape';
import { dragDroppedPicture, draw } from './drawingHelpers';

/**
 * @module DrawingLayer
 */

export class DrawingLayer extends React.Component {

  prevX = 0;
  currX = 0;
  prevX = 0;
  prevY = 0;
  dotFlag = false;
  flag = false;
  ctrlPressed = false;
  dotWasDrawn = false;

  constructor (props) {
    super(props);
    this.shapes = this.props.layer.shapes;
  }
  /**
   * Draws in mousemove process
   */
  draw = () => {
    const { changeColor, changeMouseType } = this.props;

    draw(this.canvas, changeColor.color, changeMouseType.mouseType, this.ctrlPressed, {
      prevX: this.prevX, prevY: this.prevY, currX: this.currX, currY: this.currY
    })
  }
  /**
   * Moves shapes when moveTool is selected in LeftBar
   * @param {string} res - Type of event
   * @param {object} e - mouse object
   */
  moveShape = (res, e) => {
    if (res === 'down') {
      this.prevX = this.currX;
      this.prevY = this.currY;

      this.currX = e.clientX - this.canvas.offsetLeft;
      this.currY = e.clientY - this.canvas.offsetTop;
      this.flag = true;
    }
    if (res === 'up') {
      this.flag = false;
    }
    if (res === 'move') {
      if (this.flag) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.offsetLeft;
        this.currY = e.clientY - this.canvas.offsetTop;
        const k = this.shapes.length;
        for (let i = k - 1; i >= 0; i--) {
          if (this.shapes[i].contains(this.currX, this.currY)) {
            this.shapes[i].x = this.shapes[i].x + (this.currX - this.prevX);
            this.shapes[i].y = this.shapes[i].y + (this.currY - this.prevY);
          }
        }
        this.draw();
      }
    }
  }
  pasteToCanvas = (e) => {
    console.log('paste');
    var items = e.clipboardData.items;
    console.log(items)
  }

  /**
   * Obtains coordinates of mouse over canvas and type of interaction of mouse
   * Hold ctrl to draw straight line
   * Hold shift and click points to connect points with straight line
   * @param {string} res - Type of event
   * @param {object} e - mouse object
   */
  findxy = (res, e) => {
    if (this.props.changeMouseType.mouseType === 'default') {
      this.moveShape(res, e);
      return;
    }
    if (!/draw|circle|rectangle/.test(this.props.changeMouseType.mouseType)) return;
    this.ctrlPressed = false;
    if (e.ctrlKey) {
      this.ctrlPressed = true;
    }
    if (res === 'down') {
      this.prevX = this.currX;
      this.prevY = this.currY;

      this.currX = (e.clientX - this.canvas.offsetLeft) * window.devicePixelRatio;
      this.currY = (e.clientY - this.canvas.offsetTop) * window.devicePixelRatio;

      if (/rectangle|circle/.test(this.props.changeMouseType.mouseType) || this.ctrlPressed) {
        this.prevX = this.currX;
        this.prevY = this.currY;
      }

      this.flag = true;
      if (this.props.changeMouseType.mouseType === 'draw') {
        this.dotWasDrawn = true;
        this.dotFlag = true;
      }
      if (this.dotFlag) {
        var ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        const color = this.props.changeColor.color;
        if (e.shiftKey) {
          ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
          ctx.moveTo(this.prevX, this.prevY);
          ctx.lineTo(this.currX, this.currY);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
          ctx.fillRect(this.currX, this.currY, 2, 2);
          ctx.closePath();
        }
        this.dotFlag = false;
      }
    }
    if (res === 'up' || res === 'out') {
      this.flag = false;
    }

    if (res === 'up') {
      const { layerNumber } = this.props.changeActiveLayer;
      this.props.addLine(this.canvas, layerNumber);
      this.props._changeActiveLayer(this.props.layersCRUD[layerNumber], layerNumber);
      const ctx = this.canvas.getContext('2d');
      const diffX = this.currX - this.prevX;
      const diffY = this.currY - this.prevY;
      if (this.props.changeMouseType.mouseType === 'rectangle') {
        this.shapes.push(new Shape(this.currX - diffX, this.currY - diffY, diffX, diffY, ctx.fillStyle));
      } else if (this.props.changeMouseType.mouseType === 'circle') {
        var circle = new Shape(this.currX - diffX, this.currY - diffY, Math.abs(diffX), diffY, ctx.fillStyle);
        circle.setShape('circle');
        this.shapes.push(circle);
      }
    }

    if (res === 'move') {
      if (this.flag) {
        this.dotWasDrawn = false;
        if (this.props.changeMouseType.mouseType === 'draw') {
          if (!this.ctrlPressed)
            this.prevX = this.currX;
          this.prevY = this.currY;
        }
        this.currX = (e.clientX - this.canvas.offsetLeft) * window.devicePixelRatio;
        this.currY = (e.clientY - this.canvas.offsetTop) * window.devicePixelRatio;
        this.draw();
      }
    }
  }

  /**
   * Allows to drop the image from the folder
   * @param {MouseEvent} e - necessary to disable the default drop behaviour
   */

  onDrop = (e) => {
    e.preventDefault();
    const droppedFileName = dragDroppedPicture(this.canvas, e);
    let { layer } = this.props.changeActiveLayer;
    layer.name = droppedFileName;
    this.props.changeLayer(layer, this.props.changeActiveLayer.layerNumber)
    console.log(droppedFileName);
    return false;
  }

  render () {
    const { width, height, layer } = this.props;

    return (
      <canvas className='canvaslayer'
        width={width * window.devicePixelRatio}
        height={height * window.devicePixelRatio}
        style={{ width, height, opacity: parseInt(this.props.layer.opacity) / 100 }}
        onMouseMove={(e) => this.findxy('move', e)}
        onMouseDown={(e) => this.findxy('down', e)}
        onDragOver={(e) => { e.preventDefault(); return false } }
        onDragLeave={() => false }
        onDragStart={(ev) => ev.dataTransfer.setData('Text', ev.target.id) }
        onDragEnd={() => false }
        onDrop={this.onDrop}
        onMouseUp={(e) => this.findxy('up', e)}
        onMouseOut={(e) => this.findxy('out', e)}
        onPaste={(e) => this.pasteToCanvas(e)}
        ref={(canvas) => { this.canvas = canvas }} />
    )
  }
}

DrawingLayer.propTypes = {
  changeColor: PropTypes.object,
  changeMouseType: PropTypes.object,
  changeLayer: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  addLine: PropTypes.func,
  changeActiveLayer: PropTypes.object,
  layer: PropTypes.object
}

const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => {
  return {
    addLine: (elem, layerNumber) => dispatch(addLine(elem, layerNumber)),
    changeLayer: (layer, layerId) => dispatch(changeLayer(layer, layerId)),
    _changeActiveLayer :(layer, layerNumber) => dispatch(changeActiveLayer(layer, layerNumber))
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(DrawingLayer);
