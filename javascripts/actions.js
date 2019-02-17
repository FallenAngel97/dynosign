export function changeMouseType(mouseType) {
    return { type: 'CHANGE_MOUSE_TYPE', mouseType }
}

export function deleteLayer() {
    return { type: 'DELETE_LAYER' }
}

export function addLayer() {
    return { type: 'ADD_LAYER' }
}