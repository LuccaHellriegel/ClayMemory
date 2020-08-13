import {
	CardPayload,
	FinalizedCardPayload,
	CreationType,
	UpdateType,
	CardType,
	CardOrigin,
	CardConfig,
	QAOrigin,
	SingleOrigin,
} from "./model";
import * as t from "./actionTypes";
import { Dispatch } from "redux";
import { getLastCardIDNumber, getCards, getSourceCard } from "./selectors";
import { contentStringToConfig } from "./services/config";

const createCardID = (lastCardIDNumber: number) => (lastCardIDNumber + 1).toString();

export const cardPush = (cardPayload: CardPayload) => {
	return (dispatch: Dispatch, getState: Function) => {
		dispatch({
			type: t.CARD_PUSH,
			payload: {
				...cardPayload,
				card: { ...cardPayload.card, cardID: createCardID(getLastCardIDNumber(getState())) },
			} as FinalizedCardPayload,
		});
	};
};

export const cardUpdate = (card: CardPayload) => {
	return { type: t.CARD_UPDATE, payload: card };
};

export const updateCardContent = (
	contentString: string,
	cardID: string,
	creationType: CreationType,
	updateType: UpdateType,
	origin?: CardOrigin
) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();

		const currentCard = getCards(state)[cardID as string];
		const config = contentStringToConfig(contentString, currentCard.type, creationType, updateType, currentCard);

		// const newOrigin = origin
		// 	? (currentCard.origin as QAOrigin)?.q
		// 		? { ...currentCard.origin, [creationType === "Q" ? "q" : "a"]: origin }
		// 		: origin
		// 	: undefined;
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
	// const newOrigin =
	// 	creationType !== "NOTE" && origin ? { q: {}, a: {}, [creationType === "Q" ? "q" : "a"]: origin } : origin;

	// const newOrigin = origin
	// 	? (origin as QAOrigin)?.q
	// 		? { ...origin, [creationType === "Q" ? "q" : "a"]: origin }
	// 		: origin
	// 	: undefined;
	return cardPush({ card: { ...config, origin } });
};

export const removeCard = (cardID: string) => {
	return { type: t.CARD_REMOVE, payload: cardID };
};

export const setGoalCard = (cardConfig: CardConfig, creationType: CreationType) => {
	return { type: t.CARD_GOAL, payload: { ...cardConfig, creationType } };
};

export const resetGoalCard = () => {
	return { type: t.CARD_GOAL, payload: null };
};

export const setSourceCard = (x: number, y: number, sourceField: CreationType, origin?: CardOrigin) => {
	return { type: t.CARD_SOURCE, payload: { origin, x, y, sourceField } };
};

export const resetSourceCard = () => {
	return { type: t.CARD_SOURCE, payload: null };
};

export const tryResetSourceCard = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const sourceCardExits = getSourceCard(getState()) !== null;
		if (sourceCardExits) dispatch(resetSourceCard());
	};
};
