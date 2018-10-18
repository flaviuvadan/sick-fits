import React from 'react';
import Header from "./Header";
import Meta from "./Meta";
import styled from 'styled-components';

// a tag template literal, works similar to how a function works
// a string tagged with styled.button, can have props as well
// this is pretty nice in comparison to Angular, could have a file just with these
const MyButton = styled.button`
    background: red;
    font-size: ${props => props.huge ? '100px' : '50px'};
    span {
        font-size: 50px
    }
`;

export default class Page extends React.Component {
    render() {
        return (
            <div>
                <Meta/>
                <Header/>
                {this.props.children}
            </div>
        )
    }
}