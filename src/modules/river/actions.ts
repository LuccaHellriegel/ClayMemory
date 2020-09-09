import * as t from "./actionTypes";
import { riverShowStateIsShow, getHoveredCardData, getActiveRiverMakeUpID } from "./selectors";
import { Dispatch } from "redux";
import { CardID } from "../cards/model/model-config";
import { CardField } from "../cards/model/model-content";
import { RiverContentState, ContentFilter } from "./model";

export const toggleRiverShowState = () => (dispatch: Dispatch, getState: Function) => {
	dispatch({ type: t.RIVER_SHOW_STATE, payload: riverShowStateIsShow(getState()) ? "HIDE" : "SHOW" });
};

export const setRiverContentState = (state: RiverContentState) => {
	return { type: t.RIVER_CONTENT_STATE, payload: state };
};

export const setActiveRiver = (id: string) => {
	return { type: t.RIVER_ACTIVE_ID, payload: id };
};

export const trySetActiveRiver = (id: string) => {
	return (dispatch: Dispatch, getState: Function) => {
		console.log(id, getActiveRiverMakeUpID(getState()) !== id);
		if (getActiveRiverMakeUpID(getState()) !== id) dispatch(setActiveRiver(id));
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

export const setContentFilter = (filter: ContentFilter) => {
	return { type: t.RIVER_CONTENT_FILTER, payload: filter };
};

export const resetContentFilter = () => {
	return { type: t.RIVER_CONTENT_FILTER, payload: "" };
};
