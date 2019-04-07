import React from 'react';
import './RightPanel.scss';
import { connect } from 'react-redux';
import { addLayer, deleteLayer, changeLayer, reorderLayers } from '../actions';
import Layer from './Layer';
import PropTypes from 'prop-types';
import LayerPopupContextMenu from './LayerPopupContextMenu';
import ReactDOM from 'react-dom';
import { Translate } from 'react-localize-redux';

/**
 * The panel on the right side, including layers, opacity and buttons
 * @module RightPanel
 */

export class RightPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayContext: false
    }
    this.changeLayerOpacity = this.changeLayerOpacity.bind(this);
    this.layerDragStart = this.layerDragStart.bind(this);
    this.layerDragEnd = this.layerDragEnd.bind(this);
    this.layerDrop = this.layerDrop.bind(this);
    this.layerDragOver = this.layerDragOver.bind(this);
    this.selectedLayer = null;
    this.openContext = this.openContext.bind(this);
    this.dismissPopup = this.dismissPopup.bind(this);
  }
  layerDragStart (e) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', null);
    this.selectedLayer = e.target;
  }
  layerDragEnd (e) {
  }
  layerDrop (e) {
    if (this.selectedLayer === e.target) return;
    e.target.className = 'singleLayer';
    const newIndex = [...e.target.parentNode.children].indexOf(e.target);
    const oldIndex = [...this.selectedLayer.parentNode.children].indexOf(this.selectedLayer);
    this.props.reorderLayers(oldIndex, newIndex);
  }
  layerDragOver (e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    if (this.selectedLayer === e.target) return;
    e.target.className += ' drag_under';
    e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
    return false;
  }
  layerDragLeave (e) {
    e.target.className = 'singleLayer';
  }
  changeLayerOpacity (ev) {
    let layer = this.props.changeActiveLayer.layer;
    layer.opacity = ev.target.value;
    this.props.changeLayer(layer, this.props.changeActiveLayer.layerNumber)
  }
  dismissPopup () {
    this.setState({ displayContext: false });
  }
  openContext (e) {
    const elem = ReactDOM.findDOMNode(this.context);
    elem.style.left = e.clientX + 'px';
    elem.style.top = e.clientY + 'px';
    if (window.innerHeight - e.clientY < 145) {
      elem.style.top = e.clientY - 145 + 'px';
    }
    if (window.innerWidth - e.clientX < 106) {
      elem.style.left = e.clientX - 106 + 'px';
    }
    this.setState({ displayContext: true });
  }
  render () {
    return (
      <div id='rightPanel'>
        <div id='topRightPanelIndicators'>
          <h3><Translate id='layers'/></h3>
          <input onChange={this.changeLayerOpacity} value={this.props.changeActiveLayer.layer.opacity} type="range" min="0" max="100" />
        </div>
        <div id='stackingLayers'>
          {this.props.layersCRUD.map((layer, index) => {
            return <Layer
              key={index} layerId={index}
              openContext={this.openContext}
              layerDragLeave={this.layerDragLeave}
              layerDragStart={this.layerDragStart}
              layerDragEnd={this.layerDragEnd}
              layerDrop={this.layerDrop}
              layerDragOver={this.layerDragOver}
              layer={layer} />
          })}
        </div>
        <LayerPopupContextMenu hidden={!this.state.displayContext}
          ref={ (ctx) => { this.context = ctx } }
          dismissPopup={this.dismissPopup} />
        <div id='layersButtonsBottom'>
          <button>Group</button>
          <button onClick={() => this.props.addLayer(this.props.layersCRUD.length)}>+</button>
          <button disabled={this.props.layersCRUD.length === 1} onClick={() => this.props.deleteLayer(this.props.changeActiveLayer.layerNumber)}>-</button>
        </div>
      </div>
    )
  }
}

RightPanel.propTypes = {
  changeActiveLayer: PropTypes.object,
  layersCRUD: PropTypes.array,
  changeLayer: PropTypes.func,
  addLayer: PropTypes.func,
  deleteLayer: PropTypes.func,
  reorderLayers: PropTypes.func
}

const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => {
  return {
    deleteLayer: (layerId) => dispatch(deleteLayer(layerId)),
    addLayer: (layersCount) => dispatch(addLayer(layersCount)),
    changeLayer: (layer, layerId) => dispatch(changeLayer(layer, layerId)),
    reorderLayers: (oldIndex, newIndex) => dispatch(reorderLayers(oldIndex, newIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
