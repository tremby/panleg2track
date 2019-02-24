import React from 'react';
import uuidv4 from 'uuid/v4';
import { List, Set, Map, isImmutable } from 'immutable';

import { useUndoableReducer } from './useUndoableReducer';
export { UNDO, REDO } from './useUndoableReducer';

const defaultState = {
	epidemicCount: 0,
	discard: [],
	deck: [
		[ // The starting deck has three each of the following cards
			{
				name: 'Washington',
				color: 'blue',
			},
			{
				name: 'New York',
				color: 'blue',
			},
			{
				name: 'London',
				color: 'blue',
			},
			{
				name: 'Istanbul',
				color: 'black',
			},
			{
				name: 'Cairo',
				color: 'black',
			},
			{
				name: 'Tripoli',
				color: 'black',
			},
			{
				name: 'Lagos',
				color: 'yellow',
			},
			{
				name: 'São Paulo',
				color: 'yellow',
			},
			{
				name: 'Jacksonville',
				color: 'yellow',
			},
		]

		// Duplicate each card so there are three of each
		.reduce((acc, card) => {
			acc.push(card, card, card);
			return acc;
		}, [])

		// Add a unique ID to each card and turn them into immutable Maps
		.map((card) => ({ ...card, id: uuidv4() }))
	],
};

function stateFromJs(state) {
	return Map({
		epidemicCount: state.epidemicCount,
		discard: Set(state.discard.map(Map)),
		deck: List(state.deck.map((subDeck) => Set(subDeck.map(Map)))),
	});
}

export function fromLocalStorageOrDefault() {
	const str = window.localStorage.getItem('state');
	let savedState = null;
	try {
		savedState = JSON.parse(str);
	} catch (error) {
		alert("Error loading saved state");
	}
	return stateFromJs(savedState == null ? defaultState : savedState);
}

function saveToLocalStorage(state) {
	window.localStorage.setItem('state', JSON.stringify(state.toJS()));
}

export function sortCards(a, b) {
	return a.get('name').localeCompare(b.get('name'));
}

function reducer(state, action) {
	let next;
	switch (action.type) {
		case 'add':
			const card = Map({
				...(isImmutable(action.card) ? action.card.toJS() : action.card),
				id: uuidv4(),
			});
			next = state.update('deck', (deck) => (
				deck.update(0, Set([card]), (subDeck) => subDeck.add(card))
			));
			break;
		case 'remove':
			next = state.update('deck', (deck) => (
				deck
				.map((subDeck) => subDeck.remove(action.card))
				.filter((subDeck) => subDeck.count())
			));
			break;
		case 'draw':
			next = state
			.update('deck', (deck) => (
				deck
				.map((subDeck) => subDeck.remove(action.card))
				.filter((subDeck) => subDeck.count())
			))
			.update('discard', (discard) => discard.add(action.card));
			break;
		case 'intensify':
			next = state
			.update('deck', (deck) => deck.unshift(state.get('discard')))
			.update('discard', (discard) => Set([]))
			.update('epidemicCount', (epidemicCount) => epidemicCount + 1);
			break;
		case 'flatten':
			next = state
			.update('deck', (deck) => List([deck.push(state.get('discard')).flatten(1)]))
			.update('discard', (discard) => Set([]))
			.set('epidemicCount', 0);
			break;
		default:
			throw new Error('Unknown action');
	}

	saveToLocalStorage(next);
	return next;
}

export const DeckContext = React.createContext();

export const DeckProvider = ({ children }) => (
	<DeckContext.Provider value={useUndoableReducer(reducer, fromLocalStorageOrDefault())}>
		{children}
	</DeckContext.Provider>
);

export const useDeck = () => React.useContext(DeckContext);
