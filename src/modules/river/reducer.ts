import { CardRiverState } from "./model";
import * as t from "./actionTypes";
import { CardPayload } from "../cards/model";

const intialState: CardRiverState = {
	riverMakeUps: {
		RiverMakeUp1: {
			id: "RiverMakeUp1",
			cards: [
				{ cardIndex: 0, type: "Q-A", content: { q: "Was ist der Sinn des Lebens?", a: "42" } },
				{ cardIndex: 1, type: "Q-A", content: { q: "Welches Layout macht mehr Sinn?", a: "??" } },
				{ cardIndex: 2, type: "Note", content: "Note here" },
			],
			active: true,
		},
	},
	activeRiverMakeUpIDs: ["RiverMakeUp1"],
	lastIndex: 1,
};

const copyToNewObjects = (state: CardRiverState) => {
	// manual deepish copy
	let newState = { ...state };
	// if we want to modify riverMakeUps, we need to create a new object
	newState.riverMakeUps = { ...state.riverMakeUps };
	return newState;
};

const cardRiverState = (state = intialState, { type, payload }: { type: string; payload: CardPayload }) => {
	let newState;
	switch (type) {
		case t.CARD_RIVER_PUSH:
			newState = copyToNewObjects(state);
			let currentCards = newState.riverMakeUps[payload.id].cards;
			currentCards = [...currentCards, payload.card];
			currentCards[currentCards.length - 1].cardIndex = currentCards.length - 1;
			newState.riverMakeUps[payload.id].cards = currentCards;
			return newState;
		case t.CARD_RIVER_UPDATE:
			newState = copyToNewObjects(state);
			newState.riverMakeUps[payload.id] = { ...newState.riverMakeUps[payload.id] };
			newState.riverMakeUps[payload.id].cards[payload.card.cardIndex as number] = payload.card;
			return newState;
		default:
			return state;
	}
};

export default cardRiverState;
