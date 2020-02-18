import React from 'react';
import './MainArea.scss';
import { connect } from 'react-redux';
import { redoLine, addLine } from '../actions';
import DrawingLayer from './DrawingLayer';
import SelectTool from './SelectTool';
import TextTool from './TextTool';
import PropTypes from 'prop-types';
import FontSettings from './FontSettings';
import RectangleSettings from './RectangleSettings';
import { Translate } from 'react-localize-redux';
// import ReactDOM from 'react-dom';

/**
 * The main area, which shows layers, selection box, text boxes, etc
 * @module MainArea
 */

export class MainArea extends React.Component {

  state = {
    width: 0,
    height: 0,
    defaultFont: null
  };
  layerContainer = React.createRef();
  layers = [];

  componentDidMount () {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 90 && e.ctrlKey) {
        this.props.redoLine(this.props.changeActiveLayer.layerNumber);
      }
    }, false);
  }
  /**
   * Sets the canvas size to div size
   */
  getParentSize () {
    return {
      width: (this.layerContainer.current && this.layerContainer.current.offsetWidth) || 0,
      height: (this.layerContainer.current && this.layerContainer.current.offsetHeight) || 0
    };
  }
  componentDidUpdate (prevProps) {
    const { layersCRUD } = this.props;
    if (layersCRUD !== prevProps.layersCRUD) {
      const layerIndex = this.props.changeActiveLayer.layerNumber;
      let layerImg = new Image();
      const linesArray = layersCRUD[layerIndex].linesArray;
      if (linesArray.length === 0) {
        let ctx = this.layers[layerIndex].canvas.getContext('2d');
        ctx.clearRect(0, 0, this.layers[layerIndex].canvas.width, this.layers[layerIndex].canvas.height);
      } else {
        if (layersCRUD[layerIndex].hidden === true) return;
        layerImg.src = linesArray[linesArray.length - 1];
        layerImg.onload = () => {
          let ctx = this.layers[layerIndex].canvas.getContext('2d');
          ctx.clearRect(0, 0, this.layers[layerIndex].canvas.width, this.layers[layerIndex].canvas.height);
          ctx.drawImage(layerImg, 0, 0);
        }
      }

      layersCRUD.map((layer, index) => {
        let ctx = this.layers[layerIndex].canvas.getContext('2d');
        const { text, hidden } = layer;
        const emptyTextObject = Object.entries(text).length === 0 && text.constructor === Object;
        if (!emptyTextObject) {
          ctx.fillText(text.text, parseInt(text.posX), parseInt(text.posY))
        }
        if (hidden === true) {
          let ctx = this.layers[index].canvas.getContext('2d');
          ctx.clearRect(0, 0, this.layers[index].canvas.width, this.layers[index].canvas.height);
        }
      });

      // this.layers.map((ref, index)=>{
      //    This should somehow handle the opacity
      //    if(ref) {
      //      let canvas = ReactDOM.findDOMNode(ref)
      //      const tmpdata = canvas.toDataURL()
      //      canvas.style.opacity = this.props.layersCRUD[index].opacity/100
      //      const tmpImg = new Image();
      //      let ctx = canvas.getContext('2d');
      //      tmpImg.onload = () => {
      //          ctx.drawImage(tmpImg, 0, 0);
      //          this.props.addLine(canvas, this.props.changeActiveLayer.layerNumber);
      //      }
      //      tmpImg.src = tmpdata;
      //    }
      // });
    }
  }
  render () {
    let iconType = 'default';
    const { mouseType } = this.props.changeMouseType;
    switch (mouseType) {
      case 'select':
        iconType = 'crosshair';
        break;
      case 'text':
        iconType = 'text';
        break;
      case 'draw':
        iconType = 'crosshair';
        break;
      case 'circle':
        iconType = 'crosshair';
        break;
      case 'rectangle':
        iconType = 'crosshair';
        break;
    }

    return (
      <div id='mainArea'>
        <button className="drawAnimateSelector"><Translate id='main.label.draw'/></button>
        <button className="drawAnimateSelector"><Translate id='main.label.animate'/></button>
        {mouseType === 'text' && <FontSettings />}
        {mouseType === 'rectangle' && <RectangleSettings />}
        <div ref={this.layerContainer} style={{ cursor: iconType }} id='drawingArea' >
          {this.props.layersCRUD.map((layer, index) => {
            return <DrawingLayer key={index}
              layer={layer}
              ref={_layer => { this.layers[index] = _layer }}
              width={this.getParentSize().width}
              height={this.getParentSize().height} />
          })}
          {mouseType === 'select' && <SelectTool
            width={this.getParentSize().width}
            height={this.getParentSize().height} />}
          {mouseType === 'text' && <TextTool />}
        </div>
        <div>
          Zoom <input type='text' defaultValue='100%' />
        </div>
      </div>
    )
  }
}

MainArea.propTypes = {
  changeMouseType: PropTypes.object,
  layersCRUD: PropTypes.array,
  changeActiveLayer: PropTypes.object,
  redoLine: PropTypes.func
}

const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => {
  return {
    redoLine: (layerNumber) => dispatch(redoLine(layerNumber)),
    addLine: (elem, layerNumber) => dispatch(addLine(elem, layerNumber))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainArea);
