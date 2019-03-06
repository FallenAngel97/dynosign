import React, { Component } from "react";
import move_tool from "./move_tool.svg"
import select_tool from "./select_tool.svg"
import text_tool from "./text_tool.svg";
import draw_tool from "./draw_tool.svg";
import circle_tool from "./circle_tool.svg"
import "./LeftBar.scss";
import { connect } from 'react-redux'
import {changeMouseType, change_color} from "../actions";
import {SketchPicker} from "react-color"
import ReactDOM from "react-dom";

export class LeftBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false
        }
        this.changeCursor = this.changeCursor.bind(this);
        this.showColor = this.showColor.bind(this);
        this.colorChange = this.colorChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }
    handleClick(ev) {
        const elem = ReactDOM.findDOMNode(this.colorPicker);
        if(elem && !elem.contains(ev.target) ){
            this.setState({displayColorPicker: false})
        }
    }
    showColor() {
        this.setState({displayColorPicker: true});
    }
    colorChange(color) {
        this.props.change_color(color.rgb)
    };
    changeCursor(type) {
        this.props._changeMouseType(type);
    }
    render() {
        let index = 0;
        switch(this.props.changeMouseType.mouseType) {
            case "select":
                index = 1;
                break;
            case "text":
                index = 2;
                break;
            case "draw":
                index = 3;
                break;
            case "circle":
                index = 4;
                break;
        }
        const color = this.props.changeColor.color;
        return(
            <div id='leftBar'>
                <div title="Selection tool" className={"buttonWrapper" + ((index==0) ?' activeLeftButton':'')}>
                    <img onClick={() => this.changeCursor('default')} src={move_tool} className='toolsLeftPanel' />  
                </div>
                <div title="Selection tool" className={"buttonWrapper" + ((index==1) ?' activeLeftButton':'')}>
                    <img onClick={() => this.changeCursor('select')} src={select_tool} className='toolsLeftPanel' />  
                </div>
                <div title="Text tool" className={"buttonWrapper" + ((index==2) ?' activeLeftButton':'')}>
                    <img onClick={() => this.changeCursor('text')} src={text_tool} className='toolsLeftPanel' />              
                </div>
                <div title="Draw tool" className={"buttonWrapper" + ((index==3) ?' activeLeftButton':'')}>
                    <img onClick={() => this.changeCursor('draw')} src={draw_tool} className='toolsLeftPanel' />
                </div>
                <div title="Circle tool" className={"buttonWrapper" + ((index==4) ?' activeLeftButton':'')}>
                    <img onClick={() => this.changeCursor('circle')} src={circle_tool} className='toolsLeftPanel' />   
                </div>
                <div onClick={this.showColor} className='color_small_indicator'>
                    <div style={{background: `rgba(${color.r},${color.g},${color.b},${color.a})`}}  />
                </div>
                {this.state.displayColorPicker && <SketchPicker ref={node=>this.colorPicker=node} onChange={this.colorChange} color={color} className="color_picker_dynosign" />}
            </div>
        )
    }
}

const mapStateToProps = (state) => state;

export const mapDispatchToProps = (dispatch) => {
    return {
        _changeMouseType: mouseType => dispatch(changeMouseType(mouseType)),
        change_color: color => dispatch(change_color(color))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
