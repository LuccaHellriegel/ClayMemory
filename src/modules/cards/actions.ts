import { CardPayload, FinalizedCardPayload, CreationType, UpdateType, CardType, CardOrigin, CardConfig } from "./model";
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

		dispatch(
			cardUpdate({
				card: origin ? { ...config, origin } : config,
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
	return origin ? cardPush({ card: { ...config, origin } }) : cardPush({ card: config });
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

export const setSourceCard = (x: number, y: number, origin?: CardOrigin) => {
	return { type: t.CARD_SOURCE, payload: { origin, x, y } };
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
