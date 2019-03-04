import React from "react";
import {connect} from "react-redux";

class SelectTool extends React.Component {
    constructor(props) {
        super(props);
        this.prevX = 0;
        this.currX = 0;
        this.prevX = 0;
        this.prevY = 0;
        this.flag = false;
        this.findxy = this.findxy.bind(this);
        this.draw = this.draw.bind(this);
        this.timerMarchingAnts = undefined;
    }
    draw(offsetDash) {
        var ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.setLineDash([6]);
        ctx.lineDashOffset = offsetDash;
        const diffX = this.currX - this.prevX;
        const diffY = this.currY - this.prevY;
        ctx.strokeRect(this.currX - diffX, this.currY - diffY, diffX,diffY);
        clearTimeout(this.timerMarchingAnts)
        this.timerMarchingAnts = setTimeout(()=> {
            offsetDash++;
            this.draw(offsetDash);
        }, 100);
    }
    findxy(res, e) {
        if(this.props.changeMouseType.mouseType != "select") return;
        if (res == 'down') {
            this.currX = e.clientX - this.canvas.offsetLeft;
            this.currY = e.clientY - this.canvas.offsetTop;
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.flag = true;
        }
        if (res == 'up' || res == "out") {
            this.flag = false;
        }
        
        if (res == 'move') {
            if (this.flag) {
                this.currX = e.clientX - this.canvas.offsetLeft;
                this.currY = e.clientY - this.canvas.offsetTop;
                this.draw(0);
            }
        }
    }
    render() {
        return <canvas className='canvaslayer'
            width={this.props.width}
            height={this.props.height}
            style={{width: this.props.width, height: this.props.height}}
            onMouseMove={(e)=> this.findxy('move', e)}
            onMouseDown={(e)=> this.findxy('down', e)}
            onMouseUp={(e)=> this.findxy('up', e)}
            onMouseOut={(e)=> this.findxy('out', e)}
            ref={(canvas)=>this.canvas = canvas} />
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(SelectTool);