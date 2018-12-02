import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from "../queries/queries";
import Signin from '../components/Signin';

const SigninWarning = props => (
	<Query query={CURRENT_USER_QUERY}>
		{({data, loading}) => {
			if(loading) return <p>Loading...</p>
			if(!data.currentUser) {
				return (
					<div>
						<Signin/>
					</div>
				)
			}
			return props.children;
		}}
	</Query>
);

export default SigninWarning