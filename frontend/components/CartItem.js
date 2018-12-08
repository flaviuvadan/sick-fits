import React from 'react';
import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RemoveFromCart from '../components/RemoveFromCart';


const CartItemStyles = styled.li`
	padding: 1rem 0;
	border-bottom: 1px solid ${props => props.theme.lightgrey};
	display: grid;
	align-items: center;
	grid-template-columns: auto 1fr auto;
	
	img {
		margin-right: 10px; 
	}
	 
	h3, p {
		margin: 0
	}
`;

const MissingItemStyle = styled.li`
	padding: 1rem 0;
	border-bottom: 1px solid ${props => props.theme.lightgrey};
	display: flex;
	justify-content: space-between;
	grid-template-columns: auto 1fr auto;
	
	p {
		margin: 0;
	} 
`;

const CartItem = ({ cartItem }) => {
	{
		// check if item exists
		if (!cartItem.item) return (
			<MissingItemStyle>
				<p>This item is no longer available</p>
				<RemoveFromCart id={cartItem.id}/>
			</MissingItemStyle>
		);
		return (
			<CartItemStyles>
				<img width="200" src={cartItem.item.image} alt={cartItem.item.title}/>
				<div className="cart-item-details">
					<h3>{cartItem.item.title}</h3>
					<p>
						{formatMoney(cartItem.item.price * cartItem.quantity)}
						{'-'}
						<em>
							{cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
						</em>
					</p>
				</div>
				<RemoveFromCart id={cartItem.id}/>
			</CartItemStyles>
		)
	}
};

CartItem.propTypes = {
	cartItem: PropTypes.object.isRequired,
};

export default CartItem;