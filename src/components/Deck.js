import React, { useRef } from 'react';

import { useDeck, sortCards } from '../deck';

import CardList from './CardList';

const Deck = () => {
	const { state, dispatch } = useDeck();
	const deck = state.get('deck');
	const newCardNameEl = useRef(null);
	const newCardColorEl = useRef(null);

	function addCard(event) {
		event.preventDefault();

		if (!newCardNameEl.current.value.length) {
			return;
		}

		dispatch({
			type: 'add',
			card: {
				name: newCardNameEl.current.value,
				color: newCardColorEl.current.value,
			},
		});

		newCardNameEl.current.value = '';
	}

	const flattenedDeck = deck.flatten(1);
	
	return <>
		<h2>All cards</h2>

		<div>
			<CardList
				cards={flattenedDeck.sort(sortCards)}
				actions={[
					{
						label: "Dupe",
						handler: (card) => {
							dispatch({
								type: 'add',
								card: card,
							});
						},
					},
					{
						label: "×",
						handler: (card) => {
							dispatch({
								type: 'remove',
								card: card,
							});
						},
					},
				]}
			/>
			<p>{flattenedDeck.size} cards</p>
		</div>

		<form onSubmit={addCard}>
			<input type="text" ref={newCardNameEl} />
			{' '}
			<select ref={newCardColorEl}>
				<option value="blue">Blue</option>
				<option value="yellow">Yellow</option>
				<option value="black">Black</option>
				<option value="red">Red</option>
			</select>
			{' '}
			<button type="submit">
				Add card
			</button>
		</form>
	</>;
};
export default Deck;
