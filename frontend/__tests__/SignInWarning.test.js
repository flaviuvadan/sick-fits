import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import SignInWarning from '../components/SignInWarning';
import { CURRENT_USER_QUERY } from "../queries/queries";
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser } from "../lib/testUtils";


const notSignedInMocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: {
				currentUser: null,
			},
		},
	},
];

const signedInMocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,

		},
		result: {
			data: {
				currentUser: fakeUser(),
			},
		},
	},
];

describe('<SignInWarning', () => {
	it('renders the sign in dialogue to logged out users', async () => {
		const wrapper = mount(
			<MockedProvider mocks={notSignedInMocks}>
				<SignInWarning/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		expect(wrapper.text()).toContain('Sign Into Your Account');
		expect(wrapper.find('Signin').exists()).toBe(true);
	});

	it('renders child component when user is signed in', async () => {
		const Hey = () => <p>Hey</p>;
		const wrapper = mount(
			<MockedProvider mocks={signedInMocks}>
				<SignInWarning>
					<Hey/>
				</SignInWarning>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		// the following two expects are identical tests
		expect(wrapper.contains(<Hey/>)).toBe(true);
		expect(wrapper.find('Hey').exists()).toBe(true);
	});
});

