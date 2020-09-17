import { CardConfig, CardID, strToCardConfig } from "./model/config";
import { CardPayload, cardPayloadToCardConfig, emptyNotePayload, emptyQAPayload } from "./model/payload";
import * as t from "./actionTypes";
import { Dispatch } from "redux";
import { CardField } from "./model/content";

export const cardPush = (cardPayload: CardPayload) => {
	return (dispatch: Dispatch, getState: Function) => {
		dispatch({
			type: t.CARD_PUSH,
			payload: cardPayloadToCardConfig(cardPayload, getState()),
		});
	};
};
export const emptyNoteCard = () => cardPush(emptyNotePayload());
export const emptyQACard = () => cardPush(emptyQAPayload());

export const cardReplace = (card: CardConfig) => {
	return { type: t.CARD_REPLACE, payload: card };
};
export const replaceCardFieldContent = (cardField: CardField, cardConfig: CardConfig, newValue: string) => {
	return cardReplace(strToCardConfig(newValue, cardField, "REPLACE", cardConfig));
};

export const removeCard = (cardID: CardID) => {
	return { type: t.CARD_REMOVE, payload: cardID };
};
