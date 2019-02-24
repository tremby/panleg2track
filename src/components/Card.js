import React from 'react';
import styled from 'styled-components';

const Swatch = styled.span`
	background-color: ${({ color }) => color};
	border-radius: 50%;
	width: 1em;
	height: 1em;
	display: inline-block;
	vertical-align: middle;
`;

const Card = ({ className, card, actions = [] }) => (
	<div className={className}>
		<span>
			<Swatch color={card.get('color')} />
			{' '}
			{card.get('name')}
		</span>
		{actions.length > 0 && (
			<span>
				{actions.map(({ label, handler }) => (
					<button key={label} type="button" onClick={() => handler(card)}>
						{label}
					</button>
				))}
			</span>
		)}
	</div>
);
export default styled(Card)`
	background-color: #eee;
	padding: 0.5rem;
	border-radius: 0.25rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
