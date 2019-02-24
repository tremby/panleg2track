import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = ({ className }) => (
	<nav className={className}>
		<Link to="/">About</Link>
		<Link to="/deck">Deck</Link>
		<Link to="/game">Game</Link>
	</nav>
);
export default styled(Nav)`
	display: flex;
	align-items: center;

	& > * {
		margin-left: 1rem;
	}
`;
