import { CardPayload, FinalizedCardPayload } from "./model";
import * as t from "./actionTypes";
import { Dispatch } from "redux";
import { getLastCardIDNumber } from "./selectors";

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
