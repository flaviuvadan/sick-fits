import React from 'react';
import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const CartItemStyles = styled.li`
	
`;

const CartItem = ({ cartItem }) => {
	return (
		<CartItemStyles>
			<img width="200" src={cartItem.item.image} alt={cartItem.item.title}/>
			<div className="cart-item-details">
				<h3>{cartItem.item.title}</h3>
				<p>
					{formatMoney(cartItem.item.price * cartItem.quantity)}
					{ '-' }
					<em>
						{cartItem.quantity} &times; {formatMoney(cartItem.item.price)}
					</em>
				</p>
			</div>
		</CartItemStyles>
	)
};

CartItem.propTypes = {
	cartItem: PropTypes.object.isRequired,
};

export default CartItem;