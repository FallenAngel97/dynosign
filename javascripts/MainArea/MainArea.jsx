import React from "react";
import "./MainArea.scss";
import {connect} from "react-redux";
import {addLine, redoLine} from "../actions";

class MainArea extends React.Component {
    constructor(props) {
        super(props);

        this.prevX = 0;
        this.currX = 0;
        this.prevX = 0;
        this.prevY = 0;
        this.dot_flag = false;
        this.flag = false;
        this.renderingLayer = React.createRef();

        this.findxy = this.findxy.bind(this);
        this.draw = this.draw.bind(this);
    }
    componentDidMount() {
        this.renderingLayer.current.addEventListener("mousemove",  (e) => {
            if(this.props.changeMouseType.mouseType == 'draw')
                this.findxy('move', e)
        }, false);
        this.renderingLayer.current.addEventListener("mousedown", (e) => {
            if(this.props.changeMouseType.mouseType == 'draw')
                this.findxy('down', e)
        }, false);
        this.renderingLayer.current.addEventListener("mouseup", (e) => {
            if(this.props.changeMouseType.mouseType == 'draw')
                this.findxy('up', e)
        }, false);
        this.renderingLayer.current.addEventListener("mouseout", (e) => {
            if(this.props.changeMouseType.mouseType == 'draw')
                this.findxy('out', e)
        }, false);
        window.addEventListener('keydown', (e) => {
            if(e.keyCode == 90 && e.ctrlKey) {
                console.log("redo draw");
                this.props.redoLine();
            }
        }, false)
        this.renderingLayer.current.style.width = this.layerContainer.offsetWidth;
        this.renderingLayer.current.style.height = this.layerContainer.offsetHeight;
        this.renderingLayer.current.height = this.layerContainer.offsetHeight;
        this.renderingLayer.current.width = this.layerContainer.offsetWidth;
    }
    draw() {
        var ctx = this.renderingLayer.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.currX, this.currY);
        var x = "black",
        y = 2;
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }
    findxy(res, e) {
        if (res == 'down') {
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = e.clientX - this.renderingLayer.current.offsetLeft;
            this.currY = e.clientY - this.renderingLayer.current.offsetTop;
            this.flag = true;
            this.dot_flag = true;
            if (this.dot_flag) {
                var ctx = this.renderingLayer.current.getContext('2d');
                ctx.beginPath();
                ctx.fillStyle = 'black';
                ctx.fillRect(this.currX, this.currY, 2, 2);
                ctx.closePath();
                this.dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            this.flag = false;
        }
        
        if(res=="up") this.props.addLine(this.renderingLayer.current, this.props.changeActiveLayer.layerNumber);
        
        if (res == 'move') {
            if (this.flag) {
                this.prevX = this.currX;
                this.prevY = this.currY;
                this.currX = e.clientX - this.renderingLayer.current.offsetLeft;
                this.currY = e.clientY - this.renderingLayer.current.offsetTop;
                this.draw();
            }
        }
    }
    componentDidUpdate(prevProps) {
        if(this.props.layersCRUD!=prevProps.layersCRUD) {
            let layerImg = new Image();
            const linesArray = this.props.layersCRUD[0].linesArray;
            if(linesArray.length == 0) {
                let ctx = this.renderingLayer.current.getContext('2d');
                ctx.clearRect(0, 0, this.renderingLayer.current.width, this.renderingLayer.current.height);
            } else {
                layerImg.src = linesArray[linesArray.length-1];
                layerImg.onload = () =>{ 
                    let ctx = this.renderingLayer.current.getContext('2d');
                    ctx.clearRect(0, 0, this.renderingLayer.current.width, this.renderingLayer.current.height);
                    ctx.drawImage(layerImg, 0, 0); 
                }
            }
        }
    }
    render() {
        let iconType = 'default';
        switch(this.props.changeMouseType.mouseType) {
            case "select":
                iconType = 'crosshair';
                break;
            case "text":
                iconType = 'text';
                break;
            case "draw":
                iconType = 'crosshair';
                break;
        }
        return (
            <div id='mainArea'>
                <button className="drawAnimateSelector">Draw</button>
                <button className="drawAnimateSelector">Animate</button>
                <div ref={layerContainer => this.layerContainer = layerContainer} style={{cursor: iconType}} id='drawingArea' >
                    <canvas ref={this.renderingLayer} id='renderingLayer' />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        addLine: (elem, layerNumber) => dispatch(addLine(elem, layerNumber)),
        redoLine: () => dispatch(redoLine(0))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainArea);