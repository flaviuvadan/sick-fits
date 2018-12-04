// use rccp for basic React component template

import Link from 'next/link';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';
import formatMoney from '../lib/formatMoney';


class Item extends Component {
	static propTypes = {
		// notice, can do the following for building up a custom object:
		// items: PropTypes.shape({
		// 	title: PropTypes.string.isRequired,
		// 	price: PropTypes.number.isRequired,
		items: PropTypes.object.isRequired
	};

	render() {
		// destructure the item, specifically
		const { item } = this.props;
		return (
			<ItemStyles>
				{/*a trick to check if the image is present on the item and source it if it's there*/}
				{item.image && <img src={item.image} alt={item.title}/>}

				<Title>
					<Link href={{
						pathname: '/item',
						query: {
							id: item.id
						},
					}}><a>{item.title}</a></Link>
				</Title>

				<PriceTag>{formatMoney(item.price)}</PriceTag>

				<p>{item.description}</p>

				<div className="buttonList">
					<Link href={{
						pathname: '/update',
						query: {
							id: item.id,
						}
					}}><a>Edit</a></Link>
					<AddToCart id={item.id}/>
					<DeleteItem id={item.id}>Delete</DeleteItem>
				</div>

			</ItemStyles>
		);
	}
}

Item.propTypes = {};

export default Item;