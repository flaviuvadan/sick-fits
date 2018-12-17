import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Cart from '../components/Cart';
import { LOCAL_STATE_QUERY, CURRENT_USER_QUERY } from "../queries/queries";
import { fakeUser, fakeCartItem } from "../lib/testUtils";


const mocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: {
				currentUser: {
					...fakeUser(),
					cart: [fakeCartItem()],
				},
			},
		},
	},
	{
		request: {
			query: LOCAL_STATE_QUERY,
		},
		result: {
			data: {
				cartOpen: true,
			},
		},
	},
];

describe('<Cart/>', () => {
	it('renders', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<Cart/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		expect(toJSON(wrapper.find('header'))).toMatchSnapshot();
		expect(wrapper.find('CartItem')).toHaveLength(1);
	});
});