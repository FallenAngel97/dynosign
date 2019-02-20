import React from "react";
import "./MenuActionPanel.scss";
import { connect } from "react-redux";

class MenuActionPanel extends React.Component {
    render() {
        console.log(this.props.toggleMenuBar.menuBarVisible)
        return (
            <div style={{visibility: this.props.toggleMenuBar.menuBarVisible?'visible':'hidden'}} className='menuActionPanel'>
                <span className="menuBarActionButton">Save</span>
                <span className="menuBarActionButton">Open</span>
            </div>
        )
    }
}

const mapStateToProps = state => state;


export default connect(mapStateToProps)(MenuActionPanel);
