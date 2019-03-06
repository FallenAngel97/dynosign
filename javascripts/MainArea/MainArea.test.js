import React from "react"
import { MainArea, mapDispatchToProps } from "./MainArea";

describe("MainArea tests", () => {
    test("MainArea should render properly", () => {
        let mainArea = mount(<MainArea layersCRUD={[]} changeMouseType={{mouseType: 'default'}} />);
        expect(mainArea).toMatchSnapshot();
        expect(mainArea.instance().layers).toBeTruthy();
    })
})