import React from 'react';
import { Mutation } from 'react-apollo';

export default class AddToCart extends React.Component {
	render() {
		const { id } = this.props;
		return <button>
			Add To Cart
		</button>
	}
};
