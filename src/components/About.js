import React from 'react';
import { Link } from 'react-router-dom';

const About = () => <>
	<h2>Pandemic Legacy Season 2 infection deck tracker</h2>

	<p>We're doing really badly in our Pandemic Legacy Season 2 game. Infection cards are constantly taking us by surprise so I decided it was time to start paying more attention to the deck.</p>
	<p>I tried doing this manually on paper, and this worked well enough, but I thought it'd be nice to have a little UI for it, and maybe calculate probabilities.</p>

	<h3>Usage</h3>
	<ol>
		<li>Build your deck on the <Link to="/deck">deck building page</Link>.</li>
		<li>Start a <Link to="/game">game</Link> and start tracking which cards are appearing, and when epidemics come up.</li>
		<li>Update the deck and start a new game when appropriate – the state of your deck is stored on your device.</li>
	</ol>
</>;
export default About;
