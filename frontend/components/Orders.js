import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';
import Error from '../components/ErrorMessage';
import { ORDERS_QUERY } from "../queries/queries";


class Orders extends Component {
	render() {
		return (
			<Query query={ORDERS_QUERY}>
				{({ data: { orders }, loading, error }) => {
					if (error) return <Error error={error}/>;
					if (loading) return <p>Loading...</p>;

					console.log(orders);
					return (
						<div>
							<p>Order list</p>
						</div>
					)
				}}
			</Query>
		);
	}
}

export default Orders;