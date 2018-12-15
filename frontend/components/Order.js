import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
// allows to change title
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderItemStyles';
import { ORDER_QUERY } from "../queries/queries";


class Order extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
	};

	render() {
		return (
			<Query query={ORDER_QUERY} variables={{
				id: this.props.id,
			}}>
				{({ data, error, loading }) => {
					if (error) return <Error error={error}/>;
					if (loading) return <p>Loading...</p>;
					console.log(data)
					return (
						<div>
							<p>Order ID: {this.props.id}</p>
						</div>
					);
				}}
			</Query>
		);
	}
}

export default Order;