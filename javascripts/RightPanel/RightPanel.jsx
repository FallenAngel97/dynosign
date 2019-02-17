import React from "react";
import "./RightPanel.scss";
import { connect } from "react-redux";
import { addLayer, deleteLayer } from "../actions";
import Layer from "./Layer";

class RightPanel extends React.Component {
    render() {
        return (
            <div id='rightPanel'>
                <h3>Layers</h3>
                <input type="range" min="0" max="100" />
                <div id='stackingLayers'>
                {this.props.layersCRUD.map((layer)=>{
                    return <Layer layer={layer} />
                })}
                </div>
                <div id='layersButtonsBottom'>
                    <button>Group</button>
                    <button onClick={this.props.addLayer}>+</button>
                    <button onClick={this.props.deleteLayer}>-</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        deleteLayer: () => dispatch(deleteLayer()),
        addLayer: () => dispatch(addLayer())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);