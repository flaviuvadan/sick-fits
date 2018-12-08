import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const AnimationStyles = styled.span`
	position: relative;
	
	.count {
		display: block;
		position: relative;
		transition: all 1s;
		backface-visibility: hidden;
	}
	
	/* Initial state of entered Dot */
	.count-enter {
		transform: rotateX(0.5turn);
	}
	
	.count-enter-active {
		position: absolute;
		transform: rotateX(0);
	}
	
	count-exit {
		top: 0;
		transform: rotateX(0);
	}
	
	.count-exit-active {
		transform: rotateX(0.5turn);
	}
`;

const Dot = styled.div`
	background: ${props => props.theme.red};
	color: white;
	border-radius: 50%;
	padding: 0.5rem;
	line-height: 2rem;
	min-width: 3rem;
	margin-left: 1rem;
	font-weight: 100;
	font-feature-settings: 'tnum';
	font-variant-numeric: tabular-nums;
`;

const CartCount = ({ count }) => {
	return (
		<AnimationStyles>
			<TransitionGroup>
				<CSSTransition unmountOnExit className="count" classNames="count" key={count}
							   timeout={{ enter: 1000, exit: 1000 }}>
					<Dot>{count}</Dot>
				</CSSTransition>
			</TransitionGroup>
		</AnimationStyles>
	);
};

export default CartCount;