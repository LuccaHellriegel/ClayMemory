import * as t from "./actionTypes";
import { CardRiverState, CardConfig } from "./model";

export const cardRiverUpdate = (index: number, state: CardRiverState, card: CardConfig) => {
	return { type: t.CARD_RIVER_UPDATE, riverUpdate: { index, makeUp: state.riverMakeUps[index].concat([card]) } };
};
