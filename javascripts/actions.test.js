import * as actions from "./actions";

const defaultLayer = {
    opacity: 100,
    name: 'New layer',
    hidden: false
}

describe("Redux actions testing", () => {
    it('should change mouse type', () => {
        const mouseType = 'select';
        const expectedAction = {
            type: 'CHANGE_MOUSE_TYPE',
            mouseType
        };
        expect(actions.changeMouseType(mouseType)).toEqual(expectedAction);
    })
    it("should delete layer", () => {
        const layerId = 2;
        const expectedAction = {
            type: 'DELETE_LAYER',
            layerId
        }
        expect(actions.deleteLayer(layerId)).toEqual(expectedAction);
    });
    it("should change active layer", () => {
        const layerNumber = 2;
        const layer = defaultLayer;
        const expectedAction = { type: 'CHANGE_ACTIVE_LAYER', layer, layerNumber }
        expect(actions.changeActiveLayer(layer,layerNumber)).toEqual(expectedAction);
    });
    it("should change Layer", () => {
        const layerId = 2;
        const layer = defaultLayer;
        const expectedAction = { type: 'CHANGE_LAYER', layer, layerId }
        expect(actions.changeLayer(layer,layerId)).toEqual(expectedAction);
    });
    it("should toggle Menu Bar", () => {
        const menuBarVisible = false;
        const expectedAction = {type: 'TOGGLE_MENU_BAR', menuBarVisible};
        expect(actions.toggleMenuBar(menuBarVisible)).toEqual(expectedAction);
    });
    it("should change Layer Visibility", () => {
        const hidden = true;
        const layerNumber = 3;
        const expectedAction = {type: 'CHANGE_LAYER_VISIBILITY', hidden, layerNumber};
        expect(actions.changeLayerVisibility(hidden, layerNumber)).toEqual(expectedAction);
    });
    it("should add layer", () => {
        const layersCount = 3;
        const expectedAction = { type: 'ADD_LAYER', layer: {  
            opacity: 100,
            name: 'New layer '+ layersCount,
            hidden: false},
            layerNumber: layersCount
        };
        expect(actions.addLayer(layersCount)).toEqual(expectedAction);
    })
});