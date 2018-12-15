import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
	it('renders', () => {
		shallow(<CartCount count={10}/>);
	});

	it('matches the snapshot', () => {
		const wrapper = shallow(<CartCount count={10}/>);
		// could have multiple snapshots of different component pieces
		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	it('updates via props', () => {
		// could also mount, not shallow load it
		const wrapper = shallow(<CartCount count={10}/>);
		expect(toJSON(wrapper)).toMatchSnapshot();
		wrapper.setProps({ counts: 10 });
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});