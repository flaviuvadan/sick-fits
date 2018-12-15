import SigninWarning from '../components/SignInWarning';
import Order from '../components/Order';

const Order = props => (
	<div>
		<SigninWarning>
			<p>This is a single order</p>
			<p>This is the id {props.query.id}</p>
		</SigninWarning>
	</div>
);

export default Order;