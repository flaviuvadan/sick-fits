import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import RequestReset from '../components/RequestReset';
import { REQUEST_RESET_MUTATION } from "../queries/queries";


const mocks = [
	{
		request: {
			query: REQUEST_RESET_MUTATION,
			variables: {
				email: 'starman@sickfits.com',
			},
		},
		result: {
			data: {
				requestReset: {
					__typename: 'message',
					message: '200',
				},
			},
		},
	},
];

describe('<RequestReset/>', () => {
	it('renders and matches snapshot', async () => {
		const wrapper = mount(
			<MockedProvider>
				<RequestReset/>
			</MockedProvider>
		);
		const form = wrapper.find('form[data-test="form"]');
		expect(toJSON(form)).toMatchSnapshot();
	});

	it('calls the mutation', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<RequestReset/>
			</MockedProvider>
		);
		// simulate typing an email as input
		const event = {
			target: {
				name: 'email',
				value: 'starman@sickfits.com'
			},
		};
		wrapper.find('input').simulate('change', event);
		// submit the form
		wrapper.find('form').simulate('submit');
		await wait();
		wrapper.update();
		expect(wrapper.find('p').text()).toContain('Check your email for a reset link');
	});
});