import App, { Container } from 'next/app';
import Page from '../components/Page';

class MyApp extends App {
    render() {
        const { Component } = this.props;

        return (
            <Container>
                {/*This paragraph is on every page and Next.js renders whatever component is loaded as part of the*/}
                {/*<Component/>, the reason it is imported. It is the ReactChild of the parent component*/}
                <Page>
                    <Component/>
                </Page>
            </Container>
        )
    }
}

export default MyApp;