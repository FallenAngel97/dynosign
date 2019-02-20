import React from "react";
import "./Layer.scss";
import {connect} from "react-redux";
import {changeActiveLayer, changeLayer} from "../actions"

class Layer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editLayer: false
        }
        this.renameLayer = this.renameLayer.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.layerNameChange = this.layerNameChange.bind(this);
    }
    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }
    handleClick(ev) {
        if(!this.node.contains(ev.target) ){
            this.setState({editLayer: false})
        } else {
            this.props._changeActiveLayer(this.props.layer, this.props.layerId);
        }
    }
    renameLayer() {
        this.setState({editLayer: true});
    }
    layerNameChange(ev) {
        let layer = this.props.changeActiveLayer.layer;
        layer.name = ev.target.value;
        this.props.changeLayer(layer, this.props.changeActiveLayer.layerId)
    }
    render() {
        return (
            <div ref={node=>this.node=node} onDoubleClick={this.renameLayer}
                className={"singleLayer"+((this.props.changeActiveLayer.layerNumber === this.props.layerId) ? ' activeLayer':'')}>
                {this.state.editLayer ? <input onChange={this.layerNameChange} type='text' className='singleLayerEdit' value={this.props.layer.name} /> : this.props.layer.name}
            </div>
        )
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        _changeActiveLayer: (layer,layerNumber) => dispatch(changeActiveLayer(layer,layerNumber)),
        changeLayer: (layer, layerId) => dispatch(changeLayer(layer, layerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layer);