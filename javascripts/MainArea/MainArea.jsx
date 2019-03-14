import React from 'react';
import './MainArea.scss';
import { connect } from 'react-redux';
import { redoLine, addLine } from '../actions';
import DrawingLayer from './DrawingLayer';
import SelectTool from './SelectTool';
import TextTool from './TextTool';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { ipcRenderer } from 'electron'
// import ReactDOM from 'react-dom';

export class MainArea extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };

    this.layerContainer = React.createRef();

    this.layers = [];

    this.getFontsNames = this.getFontsNames.bind(this);
  }
  componentDidMount () {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 90 && e.ctrlKey) {
        this.props.redoLine(this.props.changeActiveLayer.layerNumber);
      }
    }, false);
  }
  getParentSize () {
    return {
      width: (this.layerContainer.current && this.layerContainer.current.offsetWidth) || 0,
      height: (this.layerContainer.current && this.layerContainer.current.offsetHeight) || 0
    };
  }
  getFontsNames () {
    const fonts = ipcRenderer.sendSync('getfonts', 'ping');
    return fonts.map((font) => {
      return { value: font, label: font.family };
    });
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
        if (layer.hidden === true) {
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

    const options = this.getFontsNames();

    return (
      <div id='mainArea'>
        <button className="drawAnimateSelector">Draw</button>
        <button className="drawAnimateSelector">Animate</button>
        {mouseType === 'text' && <div id='fontSelector'>
          <Select options={options} value={null}/>
        </div>}
        <div ref={this.layerContainer} style={{ cursor: iconType }} id='drawingArea' >
          {this.props.layersCRUD.map((layer, index) => {
            return <DrawingLayer key={index}
              ref={_layer => { this.layers[index] = _layer }}
              width={this.getParentSize().width}
              height={this.getParentSize().height} />
          })}
          {mouseType === 'select' && <SelectTool
            width={this.getParentSize().width}
            height={this.getParentSize().height} />}
          {mouseType === 'text' && <TextTool />}
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
