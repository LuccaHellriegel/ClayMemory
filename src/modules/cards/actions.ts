import { CreationType, CardConfig, CardID, strToCardConfig, originToCardConfig } from "./model/model-config";
import { CardPayload, cardPayloadToCardConfig, emptyNotePayload, emptyQAPayload } from "./model/model-payload";
import * as t from "./actionTypes";
import { Dispatch } from "redux";
import { CardField, strToCardContent, StringCardContent } from "./model/model-content";
import { SingleOrigin, singleOriginToCardOrigin } from "./model/model-origin";

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

export const cardUpdate = (card: CardConfig) => {
	return { type: t.CARD_UPDATE, payload: card };
};
export const replaceCardFieldContent = (cardField: CardField, cardConfig: CardConfig, newValue: string) => {
	return cardUpdate(strToCardConfig(newValue, cardField, "REPLACE", cardConfig));
};
export const replaceCardFieldOrigin = (cardField: CardField, cardConfig: CardConfig, newOrigin: SingleOrigin) => {
	return cardUpdate(originToCardConfig(newOrigin, cardField, cardConfig));
};
export const replaceCardField = (
	cardField: CardField,
	cardConfig: CardConfig,
	newValue: StringCardContent,
	newOrigin: SingleOrigin
) => {
	const config = {
		...cardConfig,
		content: strToCardContent(newValue, cardField, "REPLACE", cardConfig.content),
		origin: singleOriginToCardOrigin(newOrigin, cardField, cardConfig.origin),
	};
	return cardUpdate(config as CardConfig);
};

export const removeCard = (cardID: CardID) => {
	return { type: t.CARD_REMOVE, payload: cardID };
};

export const setGoalCard = (cardConfig: CardConfig, creationType: CreationType) => {
	return { type: t.CARD_GOAL, payload: { ...cardConfig, creationType } };
};

export const resetGoalCard = () => {
	return { type: t.CARD_GOAL, payload: null };
};
