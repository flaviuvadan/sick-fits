import App, { Container } from 'next/app';
import Page from '../components/Page';

import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};
		// crawl pages and fetch data
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		// this exposes the query to the user
		pageProps.query = ctx.query;
		return { pageProps };
	}

	render() {
		const { Component, apollo, pageProps } = this.props;

		return (
			<Container>
				<ApolloProvider client={this.props.apollo}>
					{/*This paragraph is on every page and Next.js renders whatever component is loaded as part of the*/}
					{/*<Component/>, the reason it is imported. It is the ReactChild of the parent component*/}
					<Page>
						<Component { ...pageProps }/>
					</Page>
				</ApolloProvider>
			</Container>
		)
	}
}

export default withData(MyApp);