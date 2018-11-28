import Link from 'next/link'
import NavStyles from './styles/NavStyles';

import User from './User';
import Signout from './Signout';


// note, a stateless functional component
// doing double destructuring when we receive the payload from User
const Nav = () => (
    <NavStyles>
		<User>
			{({ data : { currentUser } }) => {
				if (currentUser) {
					return <p>{currentUser.name}</p>
				}
				return <p>User</p>
			}}
		</User>
        <Link href="/items">
            <a>Shop</a>
        </Link>
        <Link href="/sell">
            <a>Sell</a>
        </Link>
        <Link href="/signup">
            <a>Signup</a>
        </Link>
        <Link href="/orders">
            <a>Orders</a>
        </Link>
        <Link href="/account">
            <a>Account</a>
        </Link>
		<Signout>

		</Signout>
    </NavStyles>
);

export default Nav;