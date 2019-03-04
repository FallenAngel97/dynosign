import React from "react"
import { MainArea, mapDispatchToProps } from "./MainArea";
import { configure, mount, shallow} from "enzyme"
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })

describe("MainArea tests", () => {
    test("MainArea should render properly", () => {
        let mainArea = mount(<MainArea layersCRUD={[]} changeMouseType={{mouseType: 'default'}} />);
        expect(mainArea).toMatchSnapshot();
        expect(mainArea.instance().layers).toBeTruthy();
    })
})