import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';
import Error from '../components/ErrorMessage';
import { ORDERS_QUERY } from "../queries/queries";


const OrdersList = styled.ul`
	display: grid;
	grid-gap: 4rem;
	grid-template-columns: repeat(auto-fit, minimax(40%, 1fr));
`;

class Orders extends Component {
	render() {
		return (
			<Query query={ORDERS_QUERY}>
				{({ data: { orders }, loading, error }) => {
					if (error) return <Error error={error}/>;
					if (loading) return <p>Loading...</p>;

					return (
						<div>
							<h2>You have {orders.length} orders</h2>
							<OrdersList>
								{orders.map(order => {
									return (
										<OrderItemStyles key={order.id}>
											<Link href={{
												pathname: '/order',
												query: {
													id: order.id,
												}
											}}>
												<a>
													<div className="order-meta">
														<p>{order.items.reduce((total, item) => total + item.quantity, 0)} items</p>
														<p>{order.items.length} products</p>
														<p>{formatDistance(order.createdAt, new Date())} ago</p>
														<p>{formatMoney(order.total)} order total</p>
													</div>
													<div className="images">
														{order.items.map(item => {
															return <img key={item.id} src={item.image}
																		alt={item.title}/>;
														})}
													</div>
												</a>
											</Link>
										</OrderItemStyles>
									)
								})}
							</OrdersList>
						</div>
					)
				}}
			</Query>
		);
	}
}

export default Orders;