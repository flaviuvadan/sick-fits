import SigninWarning from '../components/SignInWarning';
import Orders from '../components/Orders';


const OrdersPage = props => (
	<div>
		<SigninWarning>
			<Orders/>
		</SigninWarning>
	</div>
);

export default OrdersPage;