import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from './ErrorMessage';


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
			<Form>
				<fieldset>
					<h2>Sign Up for An Account</h2>
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
						<input type="text"
							   name="password"
							   placeholder="password"
							   value={this.state.password}
							   onChange={this.saveToState}/>
					</label>
				</fieldset>
			</Form>
		)
	}
}

export default Signup;