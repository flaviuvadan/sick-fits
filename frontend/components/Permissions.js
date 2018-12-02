import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import { ALL_USERS_QUERY } from "../queries/queries";
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const PERMISSIONS = [
	'ADMIN',
	'USER',
	'ITEMCREATE',
	'ITEMUPDATE',
	'ITEMDELETE',
	'PERMISSIONUPDATE',
];

const Permissions = props => (
	<Query query={ALL_USERS_QUERY}>
		{({ data, loading, error }) => (
			<div>
				<Error error={error}/>
				<div>
					<h2>Manage Permissions</h2>
					<Table>
						<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							{PERMISSIONS.map(permission => <th key={permission}>{permission}</th>)}
							<th>Action</th>
						</tr>
						</thead>
						<tbody>{data.users.map(user => <User user={user} key={user.id}/>)}</tbody>
					</Table>
				</div>
			</div>
		)}
	</Query>
);

class User extends Component {
	render() {
		const user = this.props.user;
		return (
			<tr>
				<td>{user.name}</td>
				<td>{user.email}</td>
				{PERMISSIONS.map(permission => {
					return (
						<td key={`${user.id}-permission-${permission}`}>
							<label htmlFor={`${user.id}-permission-${permission}`}>
								<input type="checkbox"></input>
							</label>
						</td>
					)
				})}
				<td><SickButton>Update</SickButton></td>
			</tr>
		)
	}
}

export default Permissions;