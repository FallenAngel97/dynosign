import React from "react";
import "./RightPanel.scss";
import { connect } from "react-redux";
import { addLayer, deleteLayer, changeLayer } from "../actions";
import Layer from "./Layer";

class RightPanel extends React.Component {
    constructor(props) {
        super(props);
        this.changeLayerOpacity = this.changeLayerOpacity.bind(this);
    }
    changeLayerOpacity(ev) {
        let layer = this.props.changeActiveLayer.layer;
        layer.opacity = ev.target.value;
        this.props.changeLayer(layer, this.props.changeActiveLayer.layerNumber)
    }
    render() {
        return (
            <div id='rightPanel'>
                <div id='topRightPanelIndicators'>
                    <h3>Layers</h3>
                    <input onChange={this.changeLayerOpacity} value={this.props.changeActiveLayer.layer.opacity} type="range" min="0" max="100" />
                </div>
                <div id='stackingLayers'>
                    {this.props.layersCRUD.map((layer, index)=>{
                        return <Layer key={index} layerId={index} layer={layer} />
                    })}
                </div>
                <div id='layersButtonsBottom'>
                    <button>Group</button>
                    <button onClick={() => this.props.addLayer(this.props.layersCRUD.length)}>+</button>
                    <button disabled={this.props.layersCRUD.length == 1} onClick={() => this.props.deleteLayer(this.props.changeActiveLayer.layerNumber)}>-</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        deleteLayer: (layerId) => dispatch(deleteLayer(layerId)),
        addLayer: (layersCount) => dispatch(addLayer(layersCount)),
        changeLayer: (layer, layerId) => dispatch(changeLayer(layer, layerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);