import React, { Component } from "react";
import move_tool from "./move_tool.svg"
import select_tool from "./select_tool.svg"
import text_tool from "./text_tool.svg";
import "./LeftBar.scss";
import { connect } from 'react-redux'
import {changeMouseType} from "../actions";

class LeftBar extends Component {
    constructor(props) {
        super(props);
        this.changeCursor = this.changeCursor.bind(this);
    }
    changeCursor(type) {
        this.props.changeMouseType(type);
    }
    render() {
        return(
            <div id='leftBar'>
                <img onClick={() => this.changeCursor('default')} src={move_tool} className='toolsLeftPanel' />  
                <img onClick={() => this.changeCursor('select')} src={select_tool} className='toolsLeftPanel' />              
                <img onClick={() => this.changeCursor('text')} src={text_tool} className='toolsLeftPanel' />              
            </div>
        )
    }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
    return {
        changeMouseType: mouseType => dispatch(changeMouseType(mouseType))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
