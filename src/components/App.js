import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { DeckProvider } from '../deck';

import Header from './Header';
import Footer from './Footer';

import About from './About';
import Deck from './Deck';
import Game from './Game';

const GlobalStyle = createGlobalStyle`
	html {
		font-family: sans-serif;
	}
	body {
		margin: 0.5rem;
	}
	ul, ol {
		margin: 0;
	}
`

const App = ({ className }) => (
	<Router>
		<div className={className}>
			<GlobalStyle />
			<DeckProvider>
				<Header />
				<main>
					<Route exact path="/" component={About} />
					<Route exact path="/deck" component={Deck} />
					<Route exact path="/game" component={Game} />
				</main>
			</DeckProvider>
			<Footer />
		</div>
	</Router>
);
export default styled(App)`
`;
