import React from "react";
import {connect} from "react-redux";
import {addLine} from "../actions";

export class DrawingLayer extends React.Component {
    constructor(props) {
        super(props);
        this.prevX = 0;
        this.currX = 0;
        this.prevX = 0;
        this.prevY = 0;
        this.dot_flag = false;
        this.flag = false;
        this.findxy = this.findxy.bind(this);
        this.draw = this.draw.bind(this);
        this.ctrlPressed = false;
        this.dot_was_drawn = false;
    }
    draw() {
        var ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.restore();
        const color = this.props.changeColor.color;
        switch(this.props.changeMouseType.mouseType) {
            case "draw":
                if(this.ctrlPressed) {
                    ctx.moveTo(this.prevX, this.prevY);
                    ctx.lineTo(this.prevX, this.currY);
                } else {
                    ctx.moveTo(this.prevX, this.prevY);
                    ctx.lineTo(this.currX, this.currY);
                }
                var y = 2;
                ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
                ctx.lineWidth = y;
                ctx.stroke();
                break;
            case "rectangle":
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
                let diffX = this.currX - this.prevX;
                let diffY = this.currY - this.prevY;
                ctx.fillRect(this.currX - diffX, this.currY - diffY, diffX,diffY)
                break;
            case "circle":
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
                diffX = this.currX - this.prevX;
                diffY = this.currY - this.prevY;
                ctx.arc(this.currX - diffX, this.currY - diffY, Math.abs(diffX),0, 2*Math.PI)
                ctx.fill()
                break;
        }
        ctx.closePath();
    }
    findxy(res, e) {
        if(!/draw|circle|rectangle/.test(this.props.changeMouseType.mouseType)) return;
        this.ctrlPressed = false;
        if(e.ctrlKey) {
            this.ctrlPressed = true;
        }
        if (res == 'down') {
            this.prevX = this.currX;
            this.prevY = this.currY;

            this.currX = e.clientX - this.canvas.offsetLeft;
            this.currY = e.clientY - this.canvas.offsetTop;
            
            if(this.props.changeMouseType.mouseType == 'rectangle' || this.props.changeMouseType.mouseType == 'circle' || this.ctrlPressed) {
                this.prevX = this.currX;
                this.prevY = this.currY;
            }

            this.flag = true;
            if (this.props.changeMouseType.mouseType == 'draw') {
                this.dot_was_drawn = true;
                this.dot_flag = true;
            }
            if (this.dot_flag) {
                var ctx = this.canvas.getContext('2d');
                ctx.beginPath();
                const color = this.props.changeColor.color;
                if(e.shiftKey) {
                    ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
                    ctx.moveTo(this.prevX, this.prevY);    
                    ctx.lineTo(this.currX, this.currY);    
                    ctx.stroke();
                } else {
                    ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
                    ctx.fillRect(this.currX, this.currY, 2, 2);
                    ctx.closePath();
                }
                this.dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            this.flag = false;
        }
        
        if(res=="up"){
            this.props.addLine(this.canvas, this.props.changeActiveLayer.layerNumber);
        }
        
        if (res == 'move') {
            if (this.flag) {
                this.dot_was_drawn = false;
                if(this.props.changeMouseType.mouseType == 'draw') {
                    if(!this.ctrlPressed)
                        this.prevX = this.currX;
                    this.prevY = this.currY;
                }
                this.currX = e.clientX - this.canvas.offsetLeft;
                this.currY = e.clientY - this.canvas.offsetTop;
                this.draw();
            }
        }
    }
    render() {
        return (
            <canvas className='canvaslayer'
                    width={this.props.width}
                    height={this.props.height}
                    style={{width: this.props.width, height: this.props.height}}
                    onMouseMove={(e)=> this.findxy('move', e)}
                    onMouseDown={(e)=> this.findxy('down', e)}
                    onMouseUp={(e)=> this.findxy('up', e)}
                    onMouseOut={(e)=> this.findxy('out', e)}
                    ref={(canvas)=>this.canvas = canvas} />
        )
    }
}

const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => {
    return {
        addLine: (elem, layerNumber) => dispatch(addLine(elem, layerNumber)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps,null, {forwardRef: true})(DrawingLayer);
