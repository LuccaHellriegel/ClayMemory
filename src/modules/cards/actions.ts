import { CardPayload, FinalizedCardPayload, CreationType, UpdateType, CardType } from "./model";
import * as t from "./actionTypes";
import { Dispatch } from "redux";
import { getLastCardIDNumber, getCards } from "./selectors";
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
	riverID: string
) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();

		const currentCard = getCards(state)[cardID as string];
		const config = contentStringToConfig(contentString, currentCard.type, creationType, updateType, currentCard);

		dispatch(
			cardUpdate({
				riverID,
				card: config,
			})
		);
	};
};

export const pushCardContent = (
	contentString: string,
	creationType: CreationType,
	updateType: UpdateType,
	riverID: string,
	type: CardType
) => {
	const config = contentStringToConfig(contentString, type, creationType, updateType);
	return cardPush({ riverID, card: config });
};
