import React from "react";
import "./MainArea.scss";
import {connect} from "react-redux";
import {addLine, redoLine} from "../actions";
import DrawingLayer from "./DrawingLayer";
import SelectTool from "./SelectTool";
import TextTool from "./TextTool";

export class MainArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0
        };

        this.layerContainer = React.createRef();

        this.layers = [];
    }
    componentDidMount() {
        window.addEventListener('keydown', (e) => {
            if(e.keyCode == 90 && e.ctrlKey) {
                this.props.redoLine(this.props.changeActiveLayer.layerNumber);
            }
        }, false)
    }
    getParentSize() {
        return {
            width: (this.layerContainer.current && this.layerContainer.current.offsetWidth) || 0,
            height: (this.layerContainer.current && this.layerContainer.current.offsetHeight) || 0
        };
    }

    componentDidUpdate(prevProps) {
        const { layersCRUD } = this.props;
        if(layersCRUD!=prevProps.layersCRUD) {
            const layerIndex = this.props.changeActiveLayer.layerNumber;
            let layerImg = new Image();
            const linesArray = layersCRUD[layerIndex].linesArray;
            if(linesArray.length == 0) {
                let ctx = this.layers[layerIndex].canvas.getContext('2d');
                ctx.clearRect(0, 0, this.layers[layerIndex].canvas.width, this.layers[layerIndex].canvas.height);
            } else {
                if(layersCRUD[layerIndex].hidden == true) return;
                layerImg.src = linesArray[linesArray.length-1];
                layerImg.onload = () =>{ 
                    let ctx = this.layers[layerIndex].canvas.getContext('2d');
                    ctx.clearRect(0, 0, this.layers[layerIndex].canvas.width, this.layers[layerIndex].canvas.height);
                    ctx.drawImage(layerImg, 0, 0); 
                }
            }

            layersCRUD.map((layer, index)=> {
                if(layer.hidden == true) {
                    let ctx = this.layers[index].canvas.getContext('2d');
                    ctx.clearRect(0, 0, this.layers[index].canvas.width, this.layers[index].canvas.height);
                }
            });

            // this.layers.map((ref, index)=>{
            //     //This should somehow handle the opacity
            //     if(ref) {
            //         const linesArray = this.props.layersCRUD[index].linesArray;
            //         if(linesArray.length == 0) return;
            //         const tmpImageURL = ref.toDataURL()
            //         const tmpImg = new Image();
            //         let ctx = ref.getContext('2d');
            //         tmpImg.onload = () => {
            //             ctx.save();
            //             ctx.globalAlpha = this.props.layersCRUD[index].opacity/100;
            //             ctx.drawImage(tmpImg, 0, 0);
            //             ctx.restore();
            //             this.props.addLine(ref, this.props.changeActiveLayer.layerNumber);
            //         }
            //         tmpImg.src = tmpImageURL;
            //     }
            // });

        }
    }
    render() {
        let iconType = 'default';
        const { mouseType } = this.props.changeMouseType;
        switch(mouseType) {
            case "select":
                iconType = 'crosshair';
                break;
            case "text":
                iconType = 'text';
                break;
            case "draw":
                iconType = 'crosshair';
                break;
            case "circle":
                iconType = 'crosshair';
                break;
            case "rectangle":
                iconType = 'crosshair';
                break;
        }
        return (
            <div id='mainArea'>
                <button className="drawAnimateSelector">Draw</button>
                <button className="drawAnimateSelector">Animate</button>
                <div ref={this.layerContainer} style={{cursor: iconType}} id='drawingArea' >
                    {this.props.layersCRUD.map((layer, index)=> {
                        return <DrawingLayer key={index}
                                    ref={_layer=>this.layers[index] = _layer}
                                    width={this.getParentSize().width}
                                    height={this.getParentSize().height} />
                    })}
                    {mouseType == 'select' && <SelectTool
                        width={this.getParentSize().width}
                        height={this.getParentSize().height} />}
                    {mouseType == 'text' && <TextTool />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => {
    return {
        redoLine: (layerNumber) => dispatch(redoLine(layerNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainArea);
