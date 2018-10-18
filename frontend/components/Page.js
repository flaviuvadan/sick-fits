import React from 'react';
import Header from "./Header";
import Meta from "./Meta";
// ThemeProvider used for React Context, allows specifying values such as the theme and
// any child can access the values without passing down values (inheritance)
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

// this can be shared between multiple files, a simple mapping
const theme = {
    red: '#FF0000',
    black: '#393939',
    grey: '#3A3A3A',
    lightgrey: '#E1E1E1',
    offWhite: '#EDEDED',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;    
`;

export default class Page extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta/>
                    <Header/>
                    <Inner>
                        {this.props.children}
                    </Inner>
                </StyledPage>
            </ThemeProvider>
        )
    }
}