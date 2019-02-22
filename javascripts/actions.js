export function changeMouseType(mouseType) {
    return { type: 'CHANGE_MOUSE_TYPE', mouseType }
}

export function deleteLayer(layerId) {
    return { type: 'DELETE_LAYER', layerId }
}

export function changeActiveLayer(layer, layerNumber) {
    return { type: 'CHANGE_ACTIVE_LAYER', layer, layerNumber }
}

export function addLayer(layersCount) {
    return { type: 'ADD_LAYER', layer: {  
        opacity: 100,
        name: 'New layer '+ layersCount,
        hidden: false},
        layerNumber: layersCount
    }
}

export function changeLayer(layer, layerId) {
    return {type: 'CHANGE_LAYER', layer, layerId}
}

export function toggleMenuBar(menuBarVisible) {
    return {type: 'TOGGLE_MENU_BAR', menuBarVisible}
}