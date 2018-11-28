import Link from 'next/link'
import NavStyles from './styles/NavStyles';

import User from './User';
import Signout from './Signout';


// note, a stateless functional component
// doing double destructuring when we receive the payload from User
const Nav = () => (
	<User>
		{({ data: { currentUser } }) => (
			<NavStyles>
				<Link href="/items">
					<a>Shop</a>
				</Link>
				{currentUser && (
					<>
						<Link href="/sell">
							<a>Sell</a>
						</Link>
						<Link href="/orders">
							<a>Orders</a>
						</Link>
						<Link href="/account">
							<a>Account</a>
						</Link>
						<Signout/>
					</>
				)}

				{!currentUser && (
					<Link href="/signup">
						<a>Sign In</a>
					</Link>
				)}
			</NavStyles>
		)}
	</User>
);

export default Nav;