import React, { Component } from "react";
import move_tool from "./move_tool.svg"
import select_tool from "./select_tool.svg"
import text_tool from "./text_tool.svg";
import draw_tool from "./draw_tool.svg";
import circle_tool from "./circle_tool.svg"
import "./LeftBar.scss";
import { connect } from 'react-redux'
import {changeMouseType} from "../actions";

class LeftBar extends Component {
    constructor(props) {
        super(props);
        this.changeCursor = this.changeCursor.bind(this);
    }
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
            </div>
        )
    }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
    return {
        _changeMouseType: mouseType => dispatch(changeMouseType(mouseType))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
