import React, { Component } from 'react';

import { Mutation } from 'react-apollo';

class DeleteItem extends Component {
	render() {
		return (
				<button>{this.props.children}</button>
		);
	}
}

export default DeleteItem;