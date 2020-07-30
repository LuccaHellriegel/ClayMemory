import { CardRiverState, CardPayload } from "./model";
import * as t from "./actionTypes";

const intialState: CardRiverState = { riverMakeUps: [] };

const cardRiverState = (state = intialState, { type, payload }: { type: string; payload: CardPayload }) => {
	let newState;
	switch (type) {
		case t.CARD_RIVER_PUSH:
			// manual deepish copy
			newState = { ...state };
			newState.riverMakeUps = [...state.riverMakeUps];
			if (newState.riverMakeUps[payload.index] === undefined) newState.riverMakeUps[payload.index] = [];
			newState.riverMakeUps[payload.index] = [...newState.riverMakeUps[payload.index], payload.card];
			newState.riverMakeUps[payload.index][newState.riverMakeUps[payload.index].length - 1].cardIndex =
				newState.riverMakeUps[payload.index].length - 1;
			return newState;
		case t.CARD_RIVER_UPDATE:
			// manual deepish copy
			newState = { ...state };
			newState.riverMakeUps = [...state.riverMakeUps];
			newState.riverMakeUps[payload.index] = [...newState.riverMakeUps[payload.index]];
			newState.riverMakeUps[payload.index][payload.card.cardIndex as number] = payload.card;
			return newState;
		default:
			return state;
	}
};

export default cardRiverState;
