import * as t from "./actionTypes";
import { riverShowStateIsShow, getPushToRiver, getHoveredCardData, getSourceCard } from "./selectors";
import { Dispatch } from "redux";
import { CardID, CardField, CardOrigin } from "../cards/model";
import { RiverContentState } from "./model";

export const toggleRiverShowState = () => (dispatch: Dispatch, getState: Function) => {
	dispatch({ type: t.RIVER_SHOW_STATE, payload: riverShowStateIsShow(getState()) ? "HIDE" : "SHOW" });
};

export const setRiverContentState = (state: RiverContentState) => {
	return { type: t.RIVER_CONTENT_STATE, payload: state };
};

export const setPushToRiver = (id: string) => {
	return { type: t.RIVER_PUSH_STATE, payload: id };
};

export const trySetPushToRiver = (id: string) => {
	return (dispatch: Dispatch, getState: Function) => {
		if (getPushToRiver(getState()) !== id) dispatch(setPushToRiver(id));
	};
};

export const setHoveredCard = (cardID: CardID, field: CardField) => {
	return { payload: { id: cardID, field }, type: t.RIVER_HOVERED_CARD };
};

export const trySetHoveredCard = (cardID: CardID, field: CardField) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const hoveredCardData = getHoveredCardData(state);
		if (hoveredCardData.id !== cardID || hoveredCardData.field !== field) dispatch(setHoveredCard(cardID, field));
	};
};

export const setSourceCard = (sourceField: CardField, origin?: CardOrigin) => {
	return { type: t.RIVER_CARD_SOURCE, payload: { origin, sourceField } };
};

export const trySetSourceCard = (sourceField: CardField, origin?: CardOrigin) => {
	return (dispatch: Dispatch, getState: Function) => {
		const sourceCard = getSourceCard(getState());
		if (!sourceCard || sourceCard.sourceField !== sourceField || sourceCard.origin !== origin)
			dispatch(setSourceCard(sourceField, origin));
	};
};

export const resetSourceCard = () => {
	return { type: t.RIVER_CARD_SOURCE, payload: null };
};

export const tryResetSourceCard = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const sourceCardExits = getSourceCard(getState()) !== null;
		if (sourceCardExits) dispatch(resetSourceCard());
	};
};
