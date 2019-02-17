import React from "react";
import "./RightPanel.scss";

export default class RightPanel extends React.Component {
    render() {
        return (
            <div id='rightPanel'>
                <h3>Layers</h3>
                <div id='stackingLayers' />
                <div id='layersButtonsBottom'>
                    <button>+</button>
                    <button></button>
                </div>
            </div>
        )
    }
}