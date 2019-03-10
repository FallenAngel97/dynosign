import React from 'react';
import './Layer.scss';
import { connect } from 'react-redux';
import { changeActiveLayer, changeLayer, changeLayerVisibility } from '../actions'
import hiddenEye from './hidden_eye.svg';
import visibleEye from './visible_eye.svg';
import PropTypes from 'prop-types';

export class Layer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      editLayer: false
    }
    this.renameLayer = this.renameLayer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.layerNameChange = this.layerNameChange.bind(this);
    this.changeVisibility = this.changeVisibility.bind(this);
    this.ondragStart = this.ondragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
  }
  UNSAFE_componentWillMount () {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  ondragStart () {

  }
  dragEnd (e) {

  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  changeVisibility () {
    let layer = this.props.layer;
    this.props.changeLayerVisibility(!layer.hidden, this.props.layerId);
  }
  handleClick (ev) {
    if (!this.node.contains(ev.target)) {
      this.setState({ editLayer: false })
    } else if (ev.target.className.indexOf('singleLayer') > -1) {
      this.props._changeActiveLayer(this.props.layer, this.props.layerId);
    }
  }
  renameLayer () {
    this.setState({ editLayer: true });
  }
  layerNameChange (ev) {
    let layer = this.props.changeActiveLayer.layer;
    layer.name = ev.target.value;
    this.props.changeLayer(layer, this.props.changeActiveLayer.layerId)
  }
  render () {
    return (
      <div onDragStart={this.ondragStart} draggable={true} ref={node => { this.node = node }}
        onDoubleClick={this.renameLayer}
        onDragEnd={this.dragEnd}
        className={'singleLayer' + ((this.props.changeActiveLayer.layerNumber === this.props.layerId) ? ' activeLayer' : '')}>
        <img onClick={this.changeVisibility} src={this.props.layer.hidden ? hiddenEye : visibleEye}/>
        {this.state.editLayer ? <input onChange={this.layerNameChange} type='text' className='singleLayerEdit' value={this.props.layer.name} /> : this.props.layer.name}
      </div>
    )
  }
}

Layer.propTypes = {
  layer: PropTypes.object,
  changeLayerVisibility: PropTypes.func,
  layerId: PropTypes.number,
  _changeActiveLayer: PropTypes.func,
  changeActiveLayer: PropTypes.object,
  changeLayer: PropTypes.func
}

const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => {
  return {
    _changeActiveLayer: (layer, layerNumber) => dispatch(changeActiveLayer(layer, layerNumber)),
    changeLayer: (layer, layerId) => dispatch(changeLayer(layer, layerId)),
    changeLayerVisibility: (hidden, layerId) => dispatch(changeLayerVisibility(hidden, layerId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layer);
