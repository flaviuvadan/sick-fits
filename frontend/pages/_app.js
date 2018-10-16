import App, { Container } from 'next/app';

class MyApp extends App {
    render() {
        const { Component } = this.props;

        return (
            <Container>
                {/*This paragraph is on every page and Next.js renders whatever component is loaded as part of the*/}
                {/*<Component/>, the reason it is imported. It is the ReactChild of the parent component*/}
                <p>Hey I'm on every page</p>
                <Component/>
            </Container>
        )
    }
}

export default MyApp;