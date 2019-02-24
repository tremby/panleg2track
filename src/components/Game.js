import React from 'react';
import { useDeck, sortCards } from '../deck';
import styled from 'styled-components';

import CardList from './CardList';

const SubDeck = styled.div`
	padding: 0.5rem;
	margin: 0.5rem 0;
	border: 2px solid #ccc;
`;

function getInfectionRate(epidemicCount) {
	switch (epidemicCount) {
		case 0:
		case 1:
		case 2:
			return 2;
		case 3:
		case 4:
			return 3;
		case 5:
		case 6:
			return 4;
		case 7:
		default:
			return 5;
	}
}

const Game = () => {
	const { state, dispatch } = useDeck();
	const epidemicCount = state.get('epidemicCount');
	const discard = state.get('discard');
	const deck = state.get('deck');

	const draw = {
		label: "Draw",
		handler: (card) => {
			dispatch({
				type: 'draw',
				card: card,
			});
		},
	};

	return <>
		<h2>Epidemics</h2>
		<p>{epidemicCount} epidemics so far</p>
		<p>Infection rate is {getInfectionRate(epidemicCount)}</p>
		<p><button type="button" onClick={() => dispatch({ type: 'intensify' })}>Increase/intensify</button></p>
		<h2>Discard pile</h2>
		<CardList cards={discard.sort(sortCards)} />
		<h2>Infection deck</h2>
		{deck.map((subDeck, key) => (
			<SubDeck key={key}>
				<CardList
					cards={subDeck.sort(sortCards)}
					actions={[ draw ]}
				/>
			</SubDeck>
		))}
		<h2>New game</h2>
		<p><button type="button" onClick={() => dispatch({ type: 'flatten' })}>Flatten the deck</button></p>
	</>;
}
export default Game;
