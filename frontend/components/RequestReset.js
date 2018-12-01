import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { RESET_PASSWORD_MUTATION } from "../queries/queries";

class RequestReset extends Component {
	state = {
		email: '',
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
			<Mutation mutation={RESET_PASSWORD_MUTATION} variables={this.state}>
				{(reset, { error, loading }) => {
					return (
						<Form method="post" onSubmit={async e => {
							e.preventDefault();
							await reset();
							this.setState({ email: '' });
						}}>
							<fieldset disabled={loading} aria-busy={loading}>
								<h2>Reset your password</h2>
								<Error error={error}/>
								<label htmlFor="email">
									Email
									<input type="text"
										   name="email"
										   placeholder="email"
										   value={this.state.email}
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

export default Signin;