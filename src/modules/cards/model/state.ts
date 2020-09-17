import { CardConfig, CardID } from "./config";

type Cards = { [cardID: string]: CardConfig };

export type CardsState = {
	cards: Cards;
	lastCardIDNumber: number;
};
export const removeCardFromCardsState = (state: CardsState, cardID: CardID) => {
	const cards = { ...state.cards };

	// we do not reset the ID counter
	delete cards[cardID];

	return { ...state, cards };
};
export const replaceCardsInCardsState = (state: CardsState, cards: Cards, lastCardIDNumber: number) => {
	return {
		...state,
		cards,
		lastCardIDNumber,
	};
};
export const updateCardInCards = (cards: Cards, toBeUpdated: CardConfig) => {
	const cardObj = { ...cards };
	cardObj[toBeUpdated.cardID] = toBeUpdated;
	return cardObj;
};
export const addCardToCards = updateCardInCards;
