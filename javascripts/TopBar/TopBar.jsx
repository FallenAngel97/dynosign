import React from "react";
import "./TopBar.scss";
import collapse from "./collapse.svg";
import expand from "./expand.svg";
import close from "./close.svg";

const remote = require('electron').remote;

export default class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.window = remote.getCurrentWindow();
        this.minimizeWindow = this.minimizeWindow.bind(this);
        this.maximizeWindow = this.maximizeWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }
    minimizeWindow() {
        this.window.minimize();
    }
    maximizeWindow() {
        this.window.maximize();
    }
    closeWindow() {
        this.window.close();
    }
    render() {
        return (
            <header>
                <nav>
                    <span>File</span>
                    <span>Edit</span> 
                    <span>Help</span>
                </nav>
                <div id='title'>DynoSign</div>
                <div id='controlButtons'>
                    <img onClick={this.minimizeWindow} style={{verticalAlign:"bottom"}} src={collapse} />
                    <img src={expand} onClick={this.maximizeWindow} />
                    <img src={close} onClick={this.closeWindow} />
                </div>
            </header>
        )
    }
}
