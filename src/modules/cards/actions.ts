import { CardPayload } from "./model";
import * as t from "./actionTypes";

export const cardPush = (card: CardPayload) => {
	return { type: t.CARD_PUSH, payload: card };
};

export const cardUpdate = (card: CardPayload) => {
	return { type: t.CARD_UPDATE, payload: card };
};
