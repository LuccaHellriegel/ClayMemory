import {
	CardPayload,
	FinalizedCardPayload,
	CreationType,
	UpdateType,
	CardType,
	CardOrigin,
	CardConfig,
	CardID,
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

export const setSourceCard = (sourceField: CreationType, origin?: CardOrigin) => {
	return { type: t.CARD_SOURCE, payload: { origin, sourceField } };
};

export const trySetSourceCard = (sourceField: CreationType, origin?: CardOrigin) => {
	return (dispatch: Dispatch, getState: Function) => {
		const sourceCard = getSourceCard(getState());
		if (!sourceCard || sourceCard.sourceField !== sourceField || sourceCard.origin !== origin)
			dispatch(setSourceCard(sourceField, origin));
	};
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
