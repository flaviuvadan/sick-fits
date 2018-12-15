import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Order extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
	};

	render() {
		return (
			<div>
				<p>Order ID: {this.props.id}</p>
			</div>
		);
	}
}

export default Order;