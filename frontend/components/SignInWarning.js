import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from "../queries/queries";
import Signin from '../components/Signin';

const SigninWarning = props => (
	<p>Please sign in</p>
);

export default SigninWarning