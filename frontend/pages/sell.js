import CreateItem from '../components/CreateItem';
import SigninWarning from '../components/SignInWarning';


const Sell = () => (
	<div>
		<SigninWarning>
			<CreateItem/>
		</SigninWarning>
	</div>
);

export default Sell;