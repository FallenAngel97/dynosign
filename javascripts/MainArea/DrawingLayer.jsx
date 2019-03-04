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
        if(this.props.changeMouseType.mouseType == 'draw') {
            ctx.restore();
            ctx.moveTo(this.prevX, this.prevY);
            ctx.lineTo(this.currX, this.currY);
            var x = "black",
            y = 2;
            ctx.strokeStyle = x;
            ctx.lineWidth = y;
            ctx.stroke();
            ctx.closePath();
        }
        else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.setLineDash([6])
            const diffX = this.currX - this.prevX;
            const diffY = this.currY - this.prevY;
            ctx.strokeRect(this.currX - diffX, this.currY - diffY, diffX,diffY);
        }
    }
    findxy(res, e) {
        if (res == 'down') {
            this.prevX = this.currX;
            this.prevY = this.currY;

            this.currX = e.clientX - this.canvas.offsetLeft;
            this.currY = e.clientY - this.canvas.offsetTop;
            if(this.props.changeMouseType.mouseType == 'select') {
                this.prevX = this.currX;
                this.prevY = this.currY;
            }
            this.flag = true;
            this.dot_flag = true;
            if (this.dot_flag) {
                var ctx = this.canvas.getContext('2d');
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
        
        if(res=="up"){
            console.log()
            if(this.props.changeMouseType.mouseType == 'draw')
                this.props.addLine(this.canvas, this.props.changeActiveLayer.layerNumber);
            else {

            }
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