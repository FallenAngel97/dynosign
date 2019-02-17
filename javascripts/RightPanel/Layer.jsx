import React from "react";

export default class Layer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editLayer: false
        }
        this.renameLayer = this.renameLayer.bind(this);
    }
    renameLayer() {
        this.setState({editLayer: true});
    }
    render() {
        return (
            <div onDoubleClick={this.renameLayer} className="singleLayer">
                {this.state.editLayer ? <input type='text' value={this.props.layer.name} /> : this.props.layer.name}
            </div>
        )
    }
}