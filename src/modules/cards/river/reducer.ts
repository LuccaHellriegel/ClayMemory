import { RiverMakeUp, CardRiverState } from "./model";
import * as t from "./actionTypes";

const cardRiverState = (
	state: CardRiverState = { riverMakeUps: [[{ type: "Note", content: "" }]] },
	{ type, riverUpdate }: { type: string; riverUpdate: { index: number; makeUp: RiverMakeUp } }
) => {
	switch (type) {
		case t.CARD_RIVER_UPDATE:
			const newState = { ...state };
			newState.riverMakeUps[riverUpdate.index] = riverUpdate.makeUp;
			return newState;
		default:
			return state;
	}
};

export default cardRiverState;
