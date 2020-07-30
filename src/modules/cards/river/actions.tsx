import * as t from "./actionTypes";
import { CardPayload } from "./model";

export const cardRiverPush = (index: number, card: CardPayload) => {
	return { type: t.CARD_RIVER_PUSH, payload: { index, card } };
};

export const cardRiverUpdate = (card: CardPayload) => {
	return { type: t.CARD_RIVER_UPDATE, payload: card };
};
