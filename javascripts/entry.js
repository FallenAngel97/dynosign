'use strict'

import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import LeftBar from "./LeftBar/LeftBar.jsx";
import MainArea from "./MainArea/MainArea.jsx";
import RightPanel from "./RightPanel/RightPanel.jsx";
import TopBar from "./TopBar/TopBar.jsx"
import "./entry.scss";

function addLayer(state={type: 'ADD_LAYER', layerId: -1}, action) {
    if(action.type=='ADD_LAYER') {
        return Object.assign({}, state, {layerId: layerId})
    }
    return state
}

const store = createStore(addLayer);

class DynoSign extends React.Component {
    render() {
        return(
        <>
            <TopBar />
            <LeftBar />
            <MainArea />
            <RightPanel />
        </>)
    }
}

ReactDOM.render(<DynoSign />, document.getElementById('content'));

if (module.hot) {
 module.hot.accept()
}
