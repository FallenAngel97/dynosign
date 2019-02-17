import React from "react";
import "./MainArea.scss";
import {connect} from "react-redux";

class MainArea extends React.Component {
    render() {
        let iconType = 'default';
        switch(this.props.changeMouseType.mouseType) {
            case "select":
                iconType = 'crosshair';
                break;
        }
        return (
            <div id='mainArea'>
                <button className="drawAnimateSelector">Draw</button>
                <button className="drawAnimateSelector">Animate</button>
                <div style={{cursor: iconType}} id='drawingArea' />
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MainArea);