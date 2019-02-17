export function changeMouseType(mouseType) {
    return { type: 'CHANGE_MOUSE_TYPE', mouseType }
}

export function deleteLayer() {
    return { type: 'DELETE_LAYER' }
}

export function changeActiveLayer(layer, layerNumber) {
    return { type: 'CHANGE_ACTIVE_LAYER', layer, layerNumber }
}

export function addLayer() {
    return { type: 'ADD_LAYER', layer: {  
        opacity: 100,
        name: 'New layer',
        hidden: false}
    }
}

export function changeLayer(layer, layerId) {
    return {type: 'CHANGE_LAYER', layer, layerId}
}