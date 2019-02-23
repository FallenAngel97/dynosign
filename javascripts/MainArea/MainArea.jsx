import React from "react";
import "./MainArea.scss";
import {connect} from "react-redux";

class MainArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevX: 0,
            currX:0,
            prevY:0,
            currY: 0,
            dot_flag:false,
            flag: false
        }
    
        this.findxy = this.findxy.bind(this);
        this.draw = this.draw.bind(this);
    }
    componentDidMount() {
        this.renderingLayer.addEventListener("mousemove",  (e) => {
            this.findxy('move', e)
        }, false);
        this.renderingLayer.addEventListener("mousedown", (e) => {
            this.findxy('down', e)
        }, false);
        this.renderingLayer.addEventListener("mouseup", (e) => {
            this.findxy('up', e)
        }, false);
        this.renderingLayer.addEventListener("mouseout", (e) => {
            this.findxy('out', e)
        }, false);
        this.renderingLayer.style.width = this.layerContainer.offsetWidth;
        this.renderingLayer.style.height = this.layerContainer.offsetHeight;
        this.renderingLayer.height = this.layerContainer.offsetHeight;
        this.renderingLayer.width = this.layerContainer.offsetWidth;
    }
    draw() {
        var ctx = this.renderingLayer.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(this.state.prevX, this.state.prevY);
        ctx.lineTo(this.state.currX, this.state.currY);
        var x = "black",
        y = 2;
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }
    findxy(res, e) {
        if (res == 'down') {
            const prevX = this.state.currX;
            const prevY = this.state.currY;
            const currX = e.clientX - this.renderingLayer.offsetLeft;
            const currY = e.clientY - this.renderingLayer.offsetTop;

            this.setState({
                prevX,
                prevY,
                currX,
                currY,
                flag: true,
                dot_flag: true
            })
    
            if (this.state.dot_flag) {
                var ctx = this.renderingLayer.getContext('2d');
                ctx.beginPath();
                ctx.fillStyle = 'black';
                ctx.fillRect(this.state.currX, this.state.currY, 2, 2);
                ctx.closePath();
                this.setState({dot_flag: false});
            }
        }
        if (res == 'up' || res == "out") {
            this.setState({
                flag: false
            });
        }
        if (res == 'move') {
            if (this.state.flag) {
                const prevX = this.state.currX;
                const prevY = this.state.currY;
                const currX = e.clientX - this.renderingLayer.offsetLeft;
                const currY = e.clientY - this.renderingLayer.offsetTop;
                this.setState({
                    prevX, prevY, currX, currY
                })
                this.draw();
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
        }
        return (
            <div id='mainArea'>
                <button className="drawAnimateSelector">Draw</button>
                <button className="drawAnimateSelector">Animate</button>
                <div ref={layerContainer => this.layerContainer = layerContainer} style={{cursor: iconType}} id='drawingArea' >
                    <canvas ref={layer => this.renderingLayer = layer} id='renderingLayer'>

                    </canvas>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MainArea);