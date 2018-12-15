import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import DisplayError from '../components/ErrorMessage';
import { ITEM_QUERY } from '../queries/queries';


const SingleItemStyle = styled.div`
	max-width: 1200px;
	margin: 2rem auto;
	box-shadow: ${props => props.theme.bs};
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	min-height: 800px;
	
	img {
		width: 100%;
		height: 100%
		object-fit: contain;
	}
	
	.details {
		margin: 3rem;
		font-size: 2rem;
	}
`;

class SingleItem extends Component {
	render() {
		return (
			<Query query={ITEM_QUERY} variables={{ id: this.props.id }}>
				{({ error, loading, data }) => {
					if (error) return <DisplayError error={error}/>;
					if (loading) return <p>Loading...</p>;
					if (!data.item) return <p>No item with ID: {this.props.id}</p>
					return <SingleItemStyle>
						<Head>
							{/*a side-effect*/}
							{/*we are actually far from the head but NextJS allows us to do this*/}
							<title>Sick Fits | {data.item.title}</title>
						</Head>
						<img src={data.item.largeImage} alt={data.item.title}/>
						<div>
							<h2>Viewing {data.item.title}</h2>
							<p>{data.item.description}</p>
						</div>
					</SingleItemStyle>
				}}
			</Query>
		);
	}
}

export default SingleItem;