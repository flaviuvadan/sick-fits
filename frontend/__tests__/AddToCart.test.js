import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import AddToCart from '../components/AddToCart';
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from "../queries/queries";
import { fakeUser, fakeCartItem } from "../lib/testUtils";


const mocks = [
	{
		request: { query: CURRENT_USER_QUERY },
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
		request: { query: CURRENT_USER_QUERY },
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
		request: { query: ADD_TO_CART_MUTATION, variables: { id: 'abc123' } },
		result: {
			data: {
				addToCart: {
					...fakeCartItem(),
					quantity: 1,
				},
			},
		},
	},
];

describe('<AddToCart/>', () => {
	it('renders', async () => {
		const wrapper = mount(
			<MockedProvider>
				<AddToCart/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
	});

	it('adds an item to cart when clicked', async () => {
		let apolloClient;
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<ApolloConsumer>
					{client => {
						apolloClient = client;
						return <AddToCart id="abc123" />;
					}}
				</ApolloConsumer>
			</MockedProvider>
		);
		await wait();
		wrapper.update();

		const { data: { currentUser } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
		expect(currentUser.cart).toHaveLength(0);

		wrapper.find('button').simulate('click');
		await wait();

		const { data: { currentUser: secondCurrentUser} } = await apolloClient.query({ query: CURRENT_USER_QUERY });
		expect(secondCurrentUser.cart).toHaveLength(1);
		expect(secondCurrentUser.cart[0].id).toBe('omg123');
		expect(secondCurrentUser.cart[0].quantity).toBe(3);
	});

	it('changes from add to adding when clicked', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<AddToCart id="abc123" />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		expect(wrapper.text()).toContain('Add To Cart');
		wrapper.find('button').simulate('click');
		expect(wrapper.text()).toContain('Adding To Cart');
	});
});