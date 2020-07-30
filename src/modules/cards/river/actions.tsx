import * as t from "./actionTypes";
import { CardPayload } from "./model";

export const cardRiverPush = (card: CardPayload) => {
	return { type: t.CARD_RIVER_PUSH, payload: card };
};

export const cardRiverUpdate = (card: CardPayload) => {
	return { type: t.CARD_RIVER_UPDATE, payload: card };
};
