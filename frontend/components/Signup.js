import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from './ErrorMessage';


class Signup extends Component {
	render() {
		return (
			<Form>
				<fieldset>
					<h2>Sign up</h2>
				</fieldset>
			</Form>
		)
	}
}

export default Signup;