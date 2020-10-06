import { CardConfig, CardID, strToCardConfig } from "./model/config";
import { CardPayload, emptyNotePayload, emptyQAPayload } from "./model/payload";
import * as t from "./actionTypes";
import { CardField } from "./model/content";
import { ClayMemoryPayloadAction } from "../../shared/utils";

export const cardPush = (payload: CardPayload): ClayMemoryPayloadAction => {
	return {
		type: t.CARD_PUSH,
		payload,
	};
};
export const emptyNoteCard = () => cardPush(emptyNotePayload());
export const emptyQACard = () => cardPush(emptyQAPayload());

export const cardReplace = (card: CardConfig): ClayMemoryPayloadAction => {
	return { type: t.CARD_REPLACE, payload: card };
};
export const replaceCardFieldContent = (cardField: CardField, cardConfig: CardConfig, newValue: string) => {
	return cardReplace(strToCardConfig(newValue, cardField, "REPLACE", cardConfig));
};

export const removeCard = (cardID: CardID): ClayMemoryPayloadAction => {
	return { type: t.CARD_REMOVE, payload: cardID };
};
