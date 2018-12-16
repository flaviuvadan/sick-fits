import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import Signup from '../components/Signup';
import { SIGNUP_MUTATION, CURRENT_USER_QUERY } from "../queries/queries";
import { fakeUser } from "../lib/testUtils";


function type(wrapper, name, value) {
	wrapper.find(`input[name="${name}"]`).simulate('change', {
		target: {
			name,
			value,
		}
	})
}

const currentUser = fakeUser();
const mocks = [
	// signup mutation mock
	{
		request: {
			query: SIGNUP_MUTATION,
			variables: {
				email: currentUser.email,
				name: currentUser.name,
				password: 'password',
			},
		},
		result: {
			data: {
				signup: {
					__typename: 'User',
					id: 'abc123',
					email: currentUser.email,
					name: currentUser.name,
				}
			}
		},
	},
	// current user query mock
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: {
				currentUser: {
					...currentUser,
				},
			},
		},
	},
];

describe('<Signup/>', () => {
	it('renders and matches snapshot', async () => {
		const wrapper = mount(
			<MockedProvider>
				<Signup/>
			</MockedProvider>
		);
		expect(toJSON(wrapper.find('form'))).toMatchSnapshot();
	});

	it('calls mutation properly', async () => {
		let apolloClient;
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<ApolloConsumer>
					{client => {
						apolloClient = client;
						return <Signup/>
					}}
				</ApolloConsumer>
			</MockedProvider>
		);
		await wait();

		wrapper.update();
		type(wrapper, 'name', currentUser.name);
		type(wrapper, 'email', currentUser.email);
		type(wrapper, 'password', 'password');

		wrapper.update();
		wrapper.find('form').simulate('submit');
		await wait();

		// query user from Apollo client
		const user = await apolloClient.query({
				query: CURRENT_USER_QUERY,
			},
		);
		expect(user.data.currentUser).toMatchObject(currentUser);
	});
});