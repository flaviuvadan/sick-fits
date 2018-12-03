import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import { ALL_USERS_QUERY } from "../queries/queries";
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import { UPDATE_PERMISSIONS_MUTATION } from "../queries/queries";

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
						</tr>
						</thead>
						<tbody>{data.users.map(user => <UserPermissions user={user} key={user.id}/>)}</tbody>
					</Table>
				</div>
			</div>
		)}
	</Query>
);

class UserPermissions extends Component {
	static propTypes = {
		user: PropTypes.shape({
			name: PropTypes.string,
			email: PropTypes.string,
			id: PropTypes.string,
			permissions: PropTypes.array,
		}).isRequired,
	};

	// part of component, can be updated via this.setState()
	state = {
		// this is considered bad practice because props will not change the value of permissions
		// however, we are seeding the data here , update it later, and then send it with a mutation
		permissions: this.props.user.permissions,
	};

	/**
	 * Handle permission changes on the table
	 * @param e - event
	 * @param callback - callback function
	 */
	handlePermissionChange = (e, callback) => {
		const checkbox = e.target;
		// copy current permissions (deep copy)
		let updatedPermissions = [...this.state.permissions];

		if (checkbox.checked) {
			updatedPermissions.push(checkbox.value);
		} else {
			updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
		}
		// this can result in a race condition if setState is not done before updatePermissions()
		// we use updatePermissions as a callback here
		this.setState({ permissions: updatedPermissions }, () => {
			callback();
		});
	};

	render() {
		const user = this.props.user;
		return (
			<Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{
				permissions: this.state.permissions,
				userId: this.props.user.id,
			}}>
				{(updatePermissions, { loading, error }) => (
					<>
						{error && <tr>
							<td colspan="9"><Error error={error}/></td>
						</tr>}
						<tr>
							<td>{user.name}</td>
							<td>{user.email}</td>
							{PERMISSIONS.map(permission =>
								<td key={permission}>
									<label htmlFor={`${user.id}-permission-${permission}`}>
										<input id={`${user.id}-permission-${permission}`}
											   type="checkbox"
											   checked={this.state.permissions.includes(permission)}
											   value={permission}
											   onChange={(e) => {
											   	this.handlePermissionChange(e, updatePermissions)
											   }}
										/>
									</label>
								</td>
							)}
						</tr>
					</>
				)}
			</Mutation>
		)
	}
}

export default Permissions;