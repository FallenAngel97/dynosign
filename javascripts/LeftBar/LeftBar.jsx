import React from "react";
import move_tool from "./move_tool.svg"
import select_tool from "./select_tool.svg"
import "./LeftBar.scss";

export default class LeftBar extends React.Component {
    render() {
        return(
            <div id='leftBar'>
                <img src={move_tool} className='toolsLeftPanel' />  
                <img src={select_tool} className='toolsLeftPanel' />              
            </div>
        )
    }
}