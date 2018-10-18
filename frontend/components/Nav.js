import Link from 'next/link'

// note, a stateless functional component
const Nav = () => (
    <div>
        <Link href="/sell">
            <a>Sell!</a>
        </Link>
        <Link href="/">
            <a>Home!</a>
        </Link>
    </div>
);

export default Nav;