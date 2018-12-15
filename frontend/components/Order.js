import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
// allows to change title
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderItemStyles';


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