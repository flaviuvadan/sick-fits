import Head from 'next/head';

// using a lot of stateless functional components because a lot of states and lifecycle methods will be handled in
// other, higher-order components
const Meta = () => (
    <Head>
        {/*viewport allows responsive design*/}
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {/*ensure we use UTF-8 as our encoding*/}
        <meta charSet="utf-8"/>
        {/*favicon for browser tab icon */}
        <link rel="shortcut icon" href="/static/favicon.png"/>
        {/*loads some custom stylesheet (nprogress)*/}
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css"/>
        <title>Sick Fits!</title>
    </Head>
);

export default Meta;