import {
	CardPayload,
	FinalizedCardPayload,
	CreationType,
	UpdateType,
	CardType,
	CardConfig,
	CardID,
	nextCardID,
	emptyCardPayloadConfig,
} from "./model/model";
import { CardOrigin } from "./model/model-origin";
import * as t from "./actionTypes";
import { Dispatch } from "redux";
import { getLastCardIDNumber, getCards } from "./selectors";
import { contentStringToConfig } from "./services/contentStringToConfig";

export const cardPush = (cardPayload: CardPayload) => {
	return (dispatch: Dispatch, getState: Function) => {
		dispatch({
			type: t.CARD_PUSH,
			payload: {
				...cardPayload,
				card: { ...cardPayload.card, cardID: nextCardID(getLastCardIDNumber(getState())) },
			} as FinalizedCardPayload,
		});
	};
};

export const emptyCard = (type: CardType) => {
	return cardPush({ card: emptyCardPayloadConfig(type) });
};
export const emptyNoteCard = () => emptyCard("Note");
export const emptyQACard = () => emptyCard("Q-A");

export const cardUpdate = (card: CardPayload) => {
	return { type: t.CARD_UPDATE, payload: card };
};

export const updateCardContent = (
	contentString: string,
	cardID: CardID,
	creationType: CreationType,
	updateType: UpdateType,
	origin?: CardOrigin
) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();

		const currentCard = getCards(state)[cardID as string];
		const config = contentStringToConfig(contentString, currentCard.type, creationType, updateType, currentCard);

		dispatch(
			cardUpdate({
				card: { ...config, origin },
			})
		);
	};
};

export const pushCardContent = (
	contentString: string,
	creationType: CreationType,
	updateType: UpdateType,
	type: CardType,
	origin?: CardOrigin
) => {
	const config = contentStringToConfig(contentString, type, creationType, updateType);

	return cardPush({ card: { ...config, origin } });
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
