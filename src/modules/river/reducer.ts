import { CardRiverState } from "./model";
import * as t from "./actionTypes";
import { CardPayload } from "../cards/model";

const intialState: CardRiverState = {
	cards: {
		"0": { cardID: "0", type: "Q-A", content: { q: "Was ist der Sinn des Lebens?", a: "42" } },
		"1": { cardID: "1", type: "Q-A", content: { q: "Welches Layout macht mehr Sinn?", a: "??" } },
		"2": { cardID: "2", type: "Note", content: "Note here" },
	},
	riverMakeUps: {
		RiverMakeUp1: {
			riverID: "RiverMakeUp1",
			cardIDs: ["0", "1", "2"],
			active: true,
		},
	},
	activeRiverMakeUpIDs: ["RiverMakeUp1"],
	lastRiverIDNumber: 1,
	lastCardIDNumber: 2,
};

const createCardID = (lastCardIDNumber: number) => (lastCardIDNumber + 1).toString();

const cardRiverState = (state = intialState, { type, payload }: { type: string; payload: CardPayload }) => {
	let cardID;
	let riverMakeUp;
	let riverMakeUps;
	let cards;
	switch (type) {
		case t.CARD_RIVER_PUSH:
			cardID = createCardID(state.lastCardIDNumber);
			const lastCardIDNumber = state.lastCardIDNumber + 1;

			riverMakeUp = {
				...state.riverMakeUps[payload.riverID],
				cardIDs: [...state.riverMakeUps[payload.riverID].cardIDs, cardID],
			};
			riverMakeUps = { ...state.riverMakeUps };
			riverMakeUps[payload.riverID] = riverMakeUp;

			cards = { ...state.cards };
			cards[cardID] = { ...payload.card, cardID };

			return { ...state, cards, riverMakeUps: riverMakeUps, lastCardIDNumber };
		case t.CARD_RIVER_UPDATE:
			cardID = payload.card.cardID as string;
			cards = { ...state.cards };
			cards[cardID] = payload.card;

			return { ...state, cards };
		default:
			return state;
	}
};

export default cardRiverState;
