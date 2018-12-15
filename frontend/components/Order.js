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

					const order = data.order;

					return (
						<OrderStyles>
							<Head>
								<title>Sick Fits | Order</title>
							</Head>
							<p>
								<span>Order ID: </span>
								<span>{this.props.id}</span>
							</p>
							<p>
								<span>Charge: </span>
								<span>{order.charge}</span>
							</p>
							<p>
								<span>Date: </span>
								<span>{format(order.createdAt, 'MMMM d, YYYY h:mm')}</span>
							</p>
							<p>
								<span>Order total: </span>
								<span>{formatMoney(order.total)}</span>
							</p>
							<p>
								<span>Item count: </span>
								<span>{order.items.length}</span>
							</p>
							<div className="items">
								{order.items.map(item => {
									// this should really be in its own component
									return (
										<div className="order-item" key={item.id}>
											<img src={item.image} alt={item.title}/>
											<div className="item-details">
												<h2>{item.title}</h2>
												<p>Description: {item.description}</p>
												<p>Qty: {item.quantity}</p>
												<p>Each: {formatMoney(item.price)}</p>
												<p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
											</div>
										</div>
									)
								})}
							</div>
						</OrderStyles>
					);
				}}
			</Query>
		);
	}
}

export default Order;