import { CardRiverState } from "./model";
import { FinalizedCardPayload } from "../cards/model";
import cards from "../cards";

const intialState: CardRiverState = {
	riverMakeUps: {
		RiverMakeUp1: {
			riverID: "RiverMakeUp1",
			cardIDs: ["2", "0", "1"],
			active: true,
		},
	},
	activeRiverMakeUpIDs: ["RiverMakeUp1"],
	lastRiverIDNumber: 1,
};

const cardRiverState = (state = intialState, { type, payload }: { type: string; payload: FinalizedCardPayload }) => {
	let riverMakeUp;
	let riverMakeUps;
	switch (type) {
		case cards.actionTypes.CARD_PUSH:
			riverMakeUp = {
				...state.riverMakeUps[payload.riverID],
				cardIDs: [...state.riverMakeUps[payload.riverID].cardIDs, payload.card.cardID],
			};
			riverMakeUps = { ...state.riverMakeUps };
			riverMakeUps[payload.riverID] = riverMakeUp;

			return { ...state, riverMakeUps: riverMakeUps };
		default:
			return state;
	}
};

export default cardRiverState;
