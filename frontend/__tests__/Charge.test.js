import { mount } from 'enzyme';
import Router from 'next/router';
import NProgress from 'nprogress';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import Charge from '../components/Charge';
import { CREATE_ORDER_MUTATION, CURRENT_USER_QUERY } from "../queries/queries";
import { fakeUser, fakeCartItem } from "../lib/testUtils";


Router.router = {
	push() {
	},
};

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
];

describe('<Charge/>', () => {
	it('renders', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<Charge/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const checkoutButton = wrapper.find('ReactStripeCheckout');
		expect(toJSON(checkoutButton)).toMatchSnapshot();
	});
});