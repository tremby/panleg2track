import React from 'react';
import styled from 'styled-components';

const Footer = ({ className }) => (
	<footer className={className}>
		<a href="https://github.com/tremby/panleg2track/issues">Bug tracker</a> and <a href="https://github.com/tremby/panleg2track">source code at Github</a>
	</footer>
);
export default styled(Footer)`
	margin-top: 1rem;
`;
