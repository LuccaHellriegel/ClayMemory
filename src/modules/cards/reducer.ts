import * as t from "./actionTypes";
import { CardsState, FinalizedCardPayload } from "./model";

const intialState: CardsState = {
	cards: {
		"0": { cardID: "0", type: "Q-A", content: { q: "Was ist der Sinn des Lebens?", a: "42" } },
		"1": { cardID: "1", type: "Q-A", content: { q: "Welches Layout macht mehr Sinn?", a: "??" } },
		"2": { cardID: "2", type: "Note", content: "Note here" },
	},
	lastCardIDNumber: 2,
	goalCard: null,
};

const removeCard = (state: CardsState, cardID: string) => {
	const cards = { ...state.cards };

	// we do not reset the ID counter

	delete cards[cardID];

	return { ...state, cards };
};

const cards = (state = intialState, { type, payload }: { type: string; payload?: any }) => {
	let cardID;
	let cardObj;
	switch (type) {
		case t.CARD_PUSH:
			const lastCardIDNumber = state.lastCardIDNumber + 1;

			cardObj = { ...state.cards };
			cardObj[(payload as FinalizedCardPayload).card.cardID] = (payload as FinalizedCardPayload).card;

			return { ...state, cards: cardObj, lastCardIDNumber };
		case t.CARD_UPDATE:
			cardID = (payload as FinalizedCardPayload).card.cardID as string;
			cardObj = { ...state.cards };
			cardObj[cardID] = (payload as FinalizedCardPayload).card;

			return { ...state, cards: cardObj };
		case t.CARD_REMOVE:
			return removeCard(state, payload as string);
		case t.CARD_GOAL:
			return { ...state, goalCard: payload };
		default:
			return state;
	}
};

export default cards;
