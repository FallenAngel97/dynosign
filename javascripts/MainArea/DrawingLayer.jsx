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
    }
    draw() {
        var ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.restore();
        const color = this.props.changeColor.color;

        if(this.props.changeMouseType.mouseType == 'draw') {
            ctx.moveTo(this.prevX, this.prevY);
            ctx.lineTo(this.currX, this.currY);
            var y = 2;
            ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
            ctx.lineWidth = y;
            ctx.stroke();
        }
        else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
            const diffX = this.currX - this.prevX;
            const diffY = this.currY - this.prevY;
            ctx.fillRect(this.currX - diffX, this.currY - diffY, diffX,diffY)
        }
        ctx.closePath();
    }
    findxy(res, e) {
        if(!/draw|circle|rectangle/.test(this.props.changeMouseType.mouseType)) return;
        if (res == 'down') {
            this.prevX = this.currX;
            this.prevY = this.currY;

            this.currX = e.clientX - this.canvas.offsetLeft;
            this.currY = e.clientY - this.canvas.offsetTop;
            
            if(this.props.changeMouseType.mouseType == 'rectangle') {
                this.prevX = this.currX;
                this.prevY = this.currY;
            }

            this.flag = true;
            if (this.props.changeMouseType.mouseType == 'default') {
                this.dot_flag = true;
            }
            if (this.dot_flag) {
                var ctx = this.canvas.getContext('2d');
                ctx.beginPath();
                const color = this.props.changeColor.color;
                ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
                ctx.fillRect(this.currX, this.currY, 2, 2);
                ctx.closePath();
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
                if(this.props.changeMouseType.mouseType == 'draw') {
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
