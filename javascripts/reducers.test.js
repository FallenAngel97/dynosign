import {changeActiveLayer, layersCRUD, changeMouseType, toggleMenuBar} from "./reducers"

describe("Redux reducers tests. Change Active Layer", () => {
    it("should return default state of active layers", () => {
        expect(changeActiveLayer(undefined, {})).toEqual({
            type: 'CHANGE_ACTIVE_LAYER',
            layer: defaultLayer,
            layerNumber: 0
        })
    });

    it("should handle CHANGE_ACTIVE_LAYER", () => {
        expect(
            changeActiveLayer([], {type: 'CHANGE_ACTIVE_LAYER', layer: defaultLayer, layerNumber: 2})
        ).toEqual(
            {layer: defaultLayer, layerNumber: 2}
        );
    });

    it("should handle ADD_LAYER", () => {
        const action = {type: 'ADD_LAYER', layer: defaultLayer, layerNumber: 2};
        expect(changeActiveLayer([], action)).toEqual(
            {layer: defaultLayer, layerNumber: 2}
        );
        expect(layersCRUD([], action)).toEqual(
            [action.layer]
        )
    });

    it("should handle DELETE_LAYER", () => {
        const state = [
            defaultLayer, defaultLayer, defaultLayer
        ];
        const action = {type: 'DELETE_LAYER', layer: defaultLayer, layerId: 2};
        expect(changeActiveLayer({}, action)).toEqual(
            {layerNumber: 1}
        );
        expect(layersCRUD(state, action)).toEqual([
            defaultLayer, defaultLayer
        ])
    });
})

describe("Redux reducers tests. Layers CRUD", () => {
    it("should handle CHANGE_LAYER_VISIBILITY", () => {
        const state=[defaultLayer, defaultLayer];
        const hidden = true;
        const layerNumber = 0;
        const action = { type: 'CHANGE_LAYER_VISIBILITY', hidden, layerNumber }
        expect(layersCRUD(state, action)).toEqual([{
            ...defaultLayer, hidden
        }, defaultLayer])
        const action2 = { type: 'CHANGE_LAYER_VISIBILITY', hidden, layerNumber:1 }
        expect(layersCRUD(state, action2)).not.toEqual([{
            ...defaultLayer, hidden
        }, defaultLayer])
    });
    it("should handle CHANGE_LAYER", () => {
        const state=[defaultLayer, defaultLayer];
        const layer = defaultLayer;
        const layerId = 0;
        const action = { type: 'CHANGE_LAYER', layer, layerId };
        expect(layersCRUD(state, action)).toEqual([
            defaultLayer, defaultLayer
        ])
        const action2 = { type: 'CHANGE_LAYER', layer, layerId: 1 };
        expect(layersCRUD(state, action2)).toEqual([
            defaultLayer, defaultLayer
        ])
    });
    it("should handle ADD_LINE", () => {
        const state=[defaultLayer, defaultLayer];
        const layerNumber = 3;
        const canvas = document.createElement('canvas');
        const action = {
            type: 'ADD_LINE', lineData: canvas.toDataURL(), layerNumber
        };
        expect(layersCRUD(state, action)).toEqual([
            defaultLayer, defaultLayer
        ])
        const action2 = {
            type: 'ADD_LINE', lineData: canvas.toDataURL(), layerNumber: 1
        };
        expect(layersCRUD(state, action2)).not.toEqual([
            defaultLayer, defaultLayer
        ])
    });
    it("should handle REDO_LINE", () => {
        const state=[defaultLayer, defaultLayer];
        const layerNumber = 3;
        const action = {
            type: 'REDO_LINE', layerNumber
        };
        expect(layersCRUD(state, action)).toEqual([
            defaultLayer, defaultLayer
        ])
        const action2 = {
            type: 'REDO_LINE', layerNumber:0
        };
        expect(layersCRUD(state, action2)).toEqual([
            defaultLayer, defaultLayer
        ])
    });
});

describe("Redux reducers test. Mouse interactions on canvas", () => {
    it("should handle CHANGE_MOUSE_TYPE", () => {
        const mouseType = 'cursor';
        expect(changeMouseType({},{type: 'CHANGE_MOUSE_TYPE', mouseType})).toEqual({
            mouseType
        })
    });
});

describe("Redux reducers test. Changing of action menu's", () => {
    it("should handle TOGGLE_MENU_BAR", () => {
        const menuBarVisible = true;
        expect(toggleMenuBar({}, {type: 'TOGGLE_MENU_BAR', menuBarVisible})).toEqual({
            menuBarVisible
        });
    });
})