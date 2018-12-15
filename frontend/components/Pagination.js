import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import PaginationStyles from './styles/PaginationStyles';
import { Query } from 'react-apollo';
import { PAGINATION_QUERY } from '../queries/queries';
import { perPage } from '../config';


export default class Pagination extends Component {
	render() {
		return (
			<Query query={PAGINATION_QUERY}>
				{({ data, loading, error }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error!</p>;
					const count = data.itemsConnection.aggregate.count;
					const pages = Math.ceil(count / perPage);
					const page = this.props.page;
					return (
						<PaginationStyles data-test="pagination">
							<Head>
								<title>Sick Fits | Page {page} of {pages}</title>
							</Head>
							<Link prefetch href={{
								pathname: 'items',
								query: { page: page - 1 }
							}}>
								<a className="prev" aria-disabled={page <= 1}>Prev</a>
							</Link>
							<p>
								Page {page} of
								<span className="totalPages">{pages}</span>
							</p>
							<Link prefetch href={{
								pathname: 'items',
								query: { page: page + 1 }
							}}>
								<a className="next" aria-disabled={page >= pages}>Next</a>
							</Link>
						</PaginationStyles>
					)
				}}
			</Query>
		)
	}
}
