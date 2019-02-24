import React from 'react';
import styled from 'styled-components';

import Card from './Card';

const List = styled.ul`
	padding: 0;
	list-style-type: none;
`;

const Item = styled.li`
	margin-top: 0.25rem;
	margin-bottom: 0.25rem;
`;

const CardList = ({ cards, actions }) => {
	return (
		<List>
			{cards.map((card) => (
				<Item key={card.get('id')}>
					<Card
						actions={actions}
						card={card}
					/>
				</Item>
			))}
		</List>
	);
};
export default CardList;
