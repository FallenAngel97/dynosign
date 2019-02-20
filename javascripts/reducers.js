import { combineReducers } from 'redux'

const defaultLayer = {
    opacity: 100,
    name: 'New layer',
    hidden: false
}

function changeActiveLayer(
    state={type: 'CHANGE_ACTIVE_LAYER', layer: defaultLayer, layerNumber: 0}, action) {
    if(action.type == 'CHANGE_ACTIVE_LAYER') {
        return Object.assign({}, state, {layer: action.layer, layerNumber: action.layerNumber})
    }
    return state;
}

function layersCRUD(state=[defaultLayer], action) {
    if(action.type=='ADD_LAYER') {
        return [...state, action.layer]
    }
    if(action.type == 'CHANGE_LAYER') {
        return state.map((item, index)=>{
            if(index!=action.layerId) {
                return item;
            }
            return {
                ...item,
                ...action.layer
            }
        })
    }
    return state;
}

function changeMouseType(state={type: 'CHANGE_MOUSE_TYPE', mouseType: 'default'}, action) {
    if(action.type == 'CHANGE_MOUSE_TYPE') {
        return Object.assign({}, state, {mouseType: action.mouseType})
    }
    return state;
}

function toggleMenuBar(state={type: 'TOGGLE_MENU_BAR', menuBarVisible: false}, action) {
    if(action.type == 'TOGGLE_MENU_BAR') {
        return Object.assign({}, state, { menuBarVisible: action.menuBarVisible })
    }
    return state;
}

export default combineReducers({
    changeActiveLayer, 
    layersCRUD,
    changeMouseType,
    toggleMenuBar
})