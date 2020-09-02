import * as t from "./actionTypes";
import { riverShowStateIsShow, getPushToRiver, getHoveredCardData, getSourceCard } from "./selectors";
import { Dispatch } from "redux";
import { CardID } from "../cards/model/model";
import { CardField } from "../cards/model/model-content";
import { CardOrigin } from "../cards/model/model-origin";
import { RiverContentState, ContentFilter } from "./model";

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
		const highlightedCardIDData = getHoveredCardData(state);
		if (highlightedCardIDData.id !== cardID || highlightedCardIDData.field !== field)
			dispatch(setHoveredCard(cardID, field));
	};
};

export const resetHoveredCard = () => {
	return { payload: { id: null, field: null }, type: t.RIVER_HOVERED_CARD };
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

export const setContentFilter = (filter: ContentFilter) => {
	return { type: t.RIVER_CONTENT_FILTER, payload: filter };
};
