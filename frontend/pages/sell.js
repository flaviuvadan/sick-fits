import Link from 'next/link';

const Sell = props => (
    <div>
        <Link href="/sell">
            <a>Sell!</a>
        </Link>
        <Link href="/">
            <a>Home!</a>
        </Link>
    </div>
);

export default Sell;