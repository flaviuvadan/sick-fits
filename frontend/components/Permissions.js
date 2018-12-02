import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';

const Permissions = props => (
	<Query>
		{({data, loading, error}) => {
			<div>
				<Error error={error}/>
				<p>Hey</p>
			</div>
		}}
	</Query>
);

export default Permissions;