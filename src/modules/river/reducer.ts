import { CardRiverState, RiverShowState } from "./model";
import { FinalizedCardPayload } from "../cards/model";
import cards from "../cards";
import * as t from "./actionTypes";

const intialState: CardRiverState = {
	riverMakeUps: {
		RiverMakeUp1: {
			riverID: "RiverMakeUp1",
			cardIDs: ["2", "0", "1"],
			active: true,
		},
	},
	activeRiverMakeUpID: "RiverMakeUp1",
	lastRiverIDNumber: 1,
	riverShowState: "SHOW",
};

const cardRiverState = (
	state = intialState,
	{ type, payload }: { type: string; payload: FinalizedCardPayload | RiverShowState }
) => {
	let riverMakeUp;
	let riverMakeUps;
	switch (type) {
		case cards.actionTypes.CARD_PUSH:
			riverMakeUp = {
				...state.riverMakeUps[(payload as FinalizedCardPayload).riverID],
				cardIDs: [
					...state.riverMakeUps[(payload as FinalizedCardPayload).riverID].cardIDs,
					(payload as FinalizedCardPayload).card.cardID,
				],
			};
			riverMakeUps = { ...state.riverMakeUps };
			riverMakeUps[(payload as FinalizedCardPayload).riverID] = riverMakeUp;

			return { ...state, riverMakeUps: riverMakeUps };
		case t.RIVER_SHOW_STATE:
			return { ...state, riverShowState: payload as RiverShowState };
		default:
			return state;
	}
};

export default cardRiverState;
