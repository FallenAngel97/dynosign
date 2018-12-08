import React from "react";
import "./MainArea.scss";

export default class MainArea extends React.Component {
    render() {
        return (
            <div id='mainArea'>
                <button className="drawAnimateSelector">Draw</button>
                <button className="drawAnimateSelector">Animate</button>
                <div id='drawingArea' />
            </div>
        )
    }
}
