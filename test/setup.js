import { configure, shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

global.shallow = shallow;
global.render = render;
global.mount = mount;

global.defaultLayer = {
  opacity: 100,
  name: 'New layer',
  hidden: false,
  linesArray: []
}
