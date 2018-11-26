import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { SIGNUP_MUTATION } from "../queries/queries";

class Signup extends Component {
	state = {
		email: '',
		name: '',
		password: ''
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
			<Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
				{(signup, { error, loading }) => {
					return (

						<Form method="post" onSubmit={async e => {
							e.preventDefault();
							await signup();
							this.setState({ name: '', email: '', password: ''});
						}}>
							<fieldset disabled={loading} aria-busy={loading}>
								<h2>Sign Up for An Account</h2>
								<Error error={error}/>
								<label htmlFor="email">
									Email
									<input type="text"
										   name="email"
										   placeholder="email"
										   value={this.state.email}
										   onChange={this.saveToState}/>
								</label>
								<label htmlFor="name">
									Name
									<input type="text"
										   name="name"
										   placeholder="name"
										   value={this.state.name}
										   onChange={this.saveToState}/>
								</label>
								<label htmlFor="password">
									Password
									<input type="password"
										   name="password"
										   placeholder="password"
										   value={this.state.password}
										   onChange={this.saveToState}/>
								</label>

								<button type="submit">Sign Up!</button>
							</fieldset>
						</Form>
					)
				}}
			</Mutation>
		)
	}
}

export default Signup;