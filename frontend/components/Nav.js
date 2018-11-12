import Link from 'next/link'
import NavStyles from './styles/NavStyles';

// note, a stateless functional component
const Nav = () => (
    <NavStyles>
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
    </NavStyles>
);

export default Nav;