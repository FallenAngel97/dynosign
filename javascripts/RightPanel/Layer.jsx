import React from 'react';
import './Layer.scss';
import { connect } from 'react-redux';
import { changeActiveLayer, changeLayer, changeLayerVisibility } from '../actions'
import hiddenEye from './hidden_eye.svg';
import visibleEye from './visible_eye.svg';
import PropTypes from 'prop-types';

/**
 * Core module, which handles layer manipulation logic in the right panel
 * @module Layer
 */

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
    this.ondrop = this.ondrop.bind(this);
    this.DragOver = this.DragOver.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.showLayerOptions = this.showLayerOptions.bind(this);
  }
  showLayerOptions (e) {
    this.props.openContext(e);
  }
  UNSAFE_componentWillMount () {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  DragOver (e) {
    this.props.layerDragOver(e);
  }
  ondragStart (e) {
    this.props.layerDragStart(e);
  }
  dragEnd (e) {
    this.props.layerDragEnd(e);
  }
  ondrop (e) {
    this.props.layerDrop(e);
  }
  dragLeave (e) {
    this.props.layerDragLeave(e);
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  changeVisibility () {
    let layer = this.props.layer;
    this.props.changeLayerVisibility(!layer.hidden, this.props.layerId);
  }
  /**
   * Hides the text rename box, if clicked outside. If clicked on the layer single time,
   * changes the active layer to the clicked one
   * @param {MouseEvent} ev - neccessary to check, what is the clicked target
   */
  handleClick (ev) {
    if (!this.node.contains(ev.target)) {
      this.setState({ editLayer: false })
    } else if (ev.target.className.indexOf('singleLayer') > -1) {
      this.props._changeActiveLayer(this.props.layer, this.props.layerId);
    }
  }
  /**
   * Opens the rename text box
   */
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
      <div onDragStart={this.ondragStart} draggable={!this.state.editLayer} ref={node => { this.node = node }}
        onDoubleClick={this.renameLayer}
        onDrop={this.ondrop}
        onContextMenu={this.showLayerOptions}
        onDragLeave={this.dragLeave}
        onDragOver={this.DragOver}
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
  changeLayer: PropTypes.func,
  layerDragStart: PropTypes.func,
  layerDragEnd: PropTypes.func,
  layerDrop: PropTypes.func,
  layerDragOver: PropTypes.func,
  layerDragLeave: PropTypes.func,
  openContext: PropTypes.func
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
