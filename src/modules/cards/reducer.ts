import * as t from "./actionTypes";
import { CardsState, FinalizedCardPayload } from "./model";

const intialState: CardsState = {
	cards: {
		"0": { cardID: "0", type: "Q-A", content: { q: "Was ist der Sinn des Lebens?", a: "42" } },
		"1": { cardID: "1", type: "Q-A", content: { q: "Welches Layout macht mehr Sinn?", a: "??" } },
		"2": { cardID: "2", type: "Note", content: "Note here" },
	},
	lastCardIDNumber: 2,
};

const cards = (state = intialState, { type, payload }: { type: string; payload: FinalizedCardPayload }) => {
	let cardID;
	let cardObj;
	switch (type) {
		case t.CARD_PUSH:
			const lastCardIDNumber = state.lastCardIDNumber + 1;

			cardObj = { ...state.cards };
			cardObj[payload.card.cardID] = payload.card;

			return { ...state, cards: cardObj, lastCardIDNumber };
		case t.CARD_UPDATE:
			cardID = payload.card.cardID as string;
			cardObj = { ...state.cards };
			cardObj[cardID] = payload.card;

			return { ...state, cards: cardObj };
		default:
			return state;
	}
};

export default cards;
