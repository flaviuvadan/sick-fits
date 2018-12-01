import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { RESET_PASSWORD_MUTATION } from "../queries/queries";

class Reset extends Component {
	static propTypes = {
		resetToken: PropTypes.string.isRequired,
	};
	state = {
		password: '',
		confirmPassword: '',
	};

	/**
	 * Saves values to state
	 * @param e - event
	 */
	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<Mutation mutation={RESET_PASSWORD_MUTATION} variables={{
				password: this.state.password,
				confirmPassword: this.state.confirmPassword,
				resetToken: this.props.resetToken,
			}}>
				{(reset, { error, loading, called }) => {
					return (
						<Form method="post" onSubmit={async e => {
							e.preventDefault();
							const success = await reset();

							this.setState({ password: '', confirmPassword: '' });
						}}>
							<fieldset disabled={loading} aria-busy={loading}>
								<h2>Reset your password</h2>
								<Error error={error}/>

								<label htmlFor="password">
									Password
									<input type="text"
										   name="password"
										   placeholder="password"
										   value={this.state.password}
										   onChange={this.saveToState}/>
								</label>

								<label htmlFor="confirmPassword">
									Password
									<input type="text"
										   name="confirmPassword"
										   placeholder="confirmPassword"
										   value={this.state.confirmPassword}
										   onChange={this.saveToState}/>
								</label>

								<button type="submit">Reset your password</button>
							</fieldset>
						</Form>
					)
				}}
			</Mutation>
		)
	}
}

export default Reset;