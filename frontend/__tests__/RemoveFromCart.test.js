import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import RemoveFromCart from '../components/RemoveFromCart';
import { REMOVE_FROM_CART_MUTATION, CURRENT_USER_QUERY } from "../queries/queries";
import { fakeUser, fakeCartItem } from "../lib/testUtils";

global.alert = jest.fn();

const mocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: {
				currentUser: {
					...fakeUser(),
					cart: [fakeCartItem({ id: 'abc123' })],
				},
			},
		},
	},
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: {
				currentUser: {
					...fakeUser(),
					cart: [],
				},
			},
		},
	},
	{
		request: {
			query: REMOVE_FROM_CART_MUTATION,
			variables: {
				id: 'abc123',
			},
		},
		result: {
			data: {
				removeFromCart: {
					__typename: 'CartItem',
					id: 'abc123',
				},
			},
		},
	},
];

describe('<RemoveFromtCart/>', () => {
	it('renders', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<RemoveFromCart id="abc123"/>
			</MockedProvider>
		);
		expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
	});

	it('removes item from cart', async () => {
		let apolloClient;
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<ApolloConsumer>
					{client => {
						apolloClient = client;
						return <RemoveFromCart id="abc123"/>;
					}}
				</ApolloConsumer>
			</MockedProvider>
		);
		const response = await apolloClient.query({ query: CURRENT_USER_QUERY });
		expect(response.data.currentUser.cart).toHaveLength(1);
		expect(response.data.currentUser.cart[0].item.price).toBe(5000);

		wrapper.find('button').simulate('click');
		await wait();

		const response2 = await apolloClient.query({ query: CURRENT_USER_QUERY });
		expect(response2.data.currentUser.cart).toHaveLength(0);
	});
});