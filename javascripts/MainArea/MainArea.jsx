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

        this.findxy = this.findxy.bind(this);
        this.draw = this.draw.bind(this);

        this.layers = [];
    }
    componentDidMount() {
        window.addEventListener('keydown', (e) => {
            if(e.keyCode == 90 && e.ctrlKey) {
                this.props.redoLine(this.props.changeActiveLayer.layerNumber);
            }
        }, false)

        this.layers.map((ref)=>{
            ref.style.width = this.layerContainer.offsetWidth;
            ref.style.height = this.layerContainer.offsetHeight;
            ref.height = this.layerContainer.offsetHeight;
            ref.width = this.layerContainer.offsetWidth;
            ref.addEventListener("mousemove",  (e) => {
                if(this.props.changeMouseType.mouseType == 'draw' || this.props.changeMouseType.mouseType == 'select')
                    this.findxy('move', e)
            }, false);
            ref.addEventListener("mousedown", (e) => {
                if(this.props.changeMouseType.mouseType == 'draw' || this.props.changeMouseType.mouseType == 'select')
                    this.findxy('down', e)
            }, false);
            ref.addEventListener("mouseup", (e) => {
                if(this.props.changeMouseType.mouseType == 'draw' || this.props.changeMouseType.mouseType == 'select')
                    this.findxy('up', e)
            }, false);
            ref.addEventListener("mouseout", (e) => {
                if(this.props.changeMouseType.mouseType == 'draw' || this.props.changeMouseType.mouseType == 'select')
                    this.findxy('out', e)
            }, false);
        });
    }
    draw() {
        const layerIndex = this.props.changeActiveLayer.layerNumber;

        var ctx = this.layers[layerIndex].getContext('2d');
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
            ctx.clearRect(0, 0, this.layers[layerIndex].width, this.layers[layerIndex].height);
            ctx.setLineDash([6])
            const diffX = this.currX - this.prevX;
            const diffY = this.currY - this.prevY;
            ctx.strokeRect(this.currX - diffX, this.currY - diffY, diffX,diffY);
        }
    }
    findxy(res, e) {
        const layerIndex = this.props.changeActiveLayer.layerNumber;

        if (res == 'down') {
            this.prevX = this.currX;
            this.prevY = this.currY;

            this.currX = e.clientX - this.layers[layerIndex].offsetLeft;
            this.currY = e.clientY - this.layers[layerIndex].offsetTop;
            if(this.props.changeMouseType.mouseType == 'select') {
                this.prevX = this.currX;
                this.prevY = this.currY;
            }
            this.flag = true;
            this.dot_flag = true;
            if (this.dot_flag) {
                var ctx = this.layers[layerIndex].getContext('2d');
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
            if(this.props.changeMouseType.mouseType == 'draw')
                this.props.addLine(this.layers[layerIndex], this.props.changeActiveLayer.layerNumber);
            else {

            }
        }
        
        if (res == 'move') {
            if (this.flag) {
                if(this.props.changeMouseType.mouseType == 'draw') {
                    this.prevX = this.currX;
                    this.prevY = this.currY;
                }
                this.currX = e.clientX - this.layers[layerIndex].offsetLeft;
                this.currY = e.clientY - this.layers[layerIndex].offsetTop;
                this.draw();
            }
        }
    }
    componentDidUpdate(prevProps) {
        this.layers.map((ref)=>{
            if(ref && ref.getAttribute("height") == undefined) {
                ref.style.width = this.layerContainer.offsetWidth;
                ref.style.height = this.layerContainer.offsetHeight;
                ref.height = this.layerContainer.offsetHeight;
                ref.width = this.layerContainer.offsetWidth;
                ref.addEventListener("mousemove",  (e) => {
                    if(this.props.changeMouseType.mouseType == 'draw' || this.props.changeMouseType.mouseType == 'select')
                        this.findxy('move', e)
                }, false);
                ref.addEventListener("mousedown", (e) => {
                    if(this.props.changeMouseType.mouseType == 'draw' || this.props.changeMouseType.mouseType == 'select')
                        this.findxy('down', e)
                }, false);
                ref.addEventListener("mouseup", (e) => {
                    if(this.props.changeMouseType.mouseType == 'draw' || this.props.changeMouseType.mouseType == 'select')
                        this.findxy('up', e)
                }, false);
                ref.addEventListener("mouseout", (e) => {
                    if(this.props.changeMouseType.mouseType == 'draw' || this.props.changeMouseType.mouseType == 'select')
                        this.findxy('out', e)
                }, false);
            }
        });
        if(this.props.layersCRUD!=prevProps.layersCRUD) {
            const layerIndex = this.props.changeActiveLayer.layerNumber;
            let layerImg = new Image();
            const linesArray = this.props.layersCRUD[layerIndex].linesArray;

            if(linesArray.length == 0) {
                let ctx = this.layers[layerIndex].getContext('2d');
                ctx.clearRect(0, 0, this.layers[layerIndex].width, this.layers[layerIndex].height);
            } else {
                if(this.props.layersCRUD[layerIndex].hidden == true) return;
                layerImg.src = linesArray[linesArray.length-1];
                layerImg.onload = () =>{ 
                    let ctx = this.layers[layerIndex].getContext('2d');
                    ctx.clearRect(0, 0, this.layers[layerIndex].width, this.layers[layerIndex].height);
                    ctx.drawImage(layerImg, 0, 0); 
                }
            }

            this.props.layersCRUD.map((layer, index)=> {
                if(layer.hidden == true) {
                    let ctx = this.layers[index].getContext('2d');
                    ctx.clearRect(0, 0, this.layers[index].width, this.layers[index].height);
                }
            });

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
            case "circle":
                iconType = 'crosshair';
                break;
        }
        return (
            <div id='mainArea'>
                <button className="drawAnimateSelector">Draw</button>
                <button className="drawAnimateSelector">Animate</button>
                <div ref={layerContainer => this.layerContainer = layerContainer} style={{cursor: iconType}} id='drawingArea' >
                    {this.props.layersCRUD.map((layer, index)=> {
                        return <canvas className='canvaslayer' key={index} ref={(_ref)=>this.layers[index] = _ref} />
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        addLine: (elem, layerNumber) => dispatch(addLine(elem, layerNumber)),
        redoLine: (layerNumber) => dispatch(redoLine(layerNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainArea);