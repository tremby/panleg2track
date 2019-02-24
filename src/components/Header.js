import React from 'react';
import styled from 'styled-components';

import { useDeck, UNDO, REDO } from '../deck';

import Nav from './Nav';

const Header = ({ className }) => {
	const { dispatch, canUndo, canRedo } = useDeck();

	return (
		<header className={className}>
			<h1>PL2track</h1>
			<span>
				<button onClick={() => dispatch({ type: UNDO })} disabled={!canUndo}>
					Undo
				</button>
				<button onClick={() => dispatch({ type: REDO })} disabled={!canRedo}>
					Redo
				</button>
			</span>
			<Nav />
		</header>
	);
};
export default styled(Header)`
	margin-bottom: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
