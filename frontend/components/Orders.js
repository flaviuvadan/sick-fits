import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';


class Orders extends Component {
	render() {
		return (
			<div>
				<p>Order list</p>
			</div>
		);
	}
}

export default Orders;