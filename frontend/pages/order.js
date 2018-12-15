import SigninWarning from '../components/SignInWarning';
import Order from '../components/Order';


const OrderPage = props => (
	<div>
		<SigninWarning>
			<Order id={props.query.id}/>
		</SigninWarning>
	</div>
);

export default OrderPage;