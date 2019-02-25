import React from "react";
import "./Layer.scss";
import {connect} from "react-redux";
import {changeActiveLayer, changeLayer, changeLayerVisibility} from "../actions"
import hidden_eye from "./hidden_eye.svg";
import visible_eye from "./visible_eye.svg";

export class Layer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editLayer: false
        }
        this.renameLayer = this.renameLayer.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.layerNameChange = this.layerNameChange.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);
    }
    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }
    changeVisibility() {
        let layer = this.props.layer;
        this.props.changeLayerVisibility(!layer.hidden, this.props.layerId);
    }
    handleClick(ev) {
        if(!this.node.contains(ev.target) ){
            this.setState({editLayer: false})
        } else if(ev.target.className.indexOf("singleLayer")>-1) {
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
                <img onClick={this.changeVisibility} src={this.props.layer.hidden ? hidden_eye : visible_eye}/>
                {this.state.editLayer ? <input onChange={this.layerNameChange} type='text' className='singleLayerEdit' value={this.props.layer.name} /> : this.props.layer.name}
            </div>
        )
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        _changeActiveLayer: (layer,layerNumber) => dispatch(changeActiveLayer(layer,layerNumber)),
        changeLayer: (layer, layerId) => dispatch(changeLayer(layer, layerId)),
        changeLayerVisibility: (hidden, layerId) => dispatch(changeLayerVisibility(hidden, layerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layer);