import React from "react";
import {connect} from "react-redux";

export class TextTool extends React.Component {
    render() {
        return (
            <div id='text_tool_drawing_area'>
            </div>
        )
    };
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(TextTool);
