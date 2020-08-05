import { CardRiverState } from "./model";
import { CardPayload } from "../cards/model";
import cards from "../cards";

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
	let cardObj;
	switch (type) {
		case cards.actionTypes.CARD_PUSH:
			cardID = createCardID(state.lastCardIDNumber);
			const lastCardIDNumber = state.lastCardIDNumber + 1;

			riverMakeUp = {
				...state.riverMakeUps[payload.riverID],
				cardIDs: [...state.riverMakeUps[payload.riverID].cardIDs, cardID],
			};
			riverMakeUps = { ...state.riverMakeUps };
			riverMakeUps[payload.riverID] = riverMakeUp;

			cardObj = { ...state.cards };
			cardObj[cardID] = { ...payload.card, cardID };

			return { ...state, cards: cardObj, riverMakeUps: riverMakeUps, lastCardIDNumber };
		case cards.actionTypes.CARD_UPDATE:
			cardID = payload.card.cardID as string;
			cardObj = { ...state.cards };
			cardObj[cardID] = payload.card;

			return { ...state, cards: cardObj };
		default:
			return state;
	}
};

export default cardRiverState;
