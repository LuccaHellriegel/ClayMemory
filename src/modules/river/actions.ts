import * as t from "./actionTypes";
import { riverShowStateIsShow, getPushToRiver, getHoveredCardData } from "./selectors";
import { Dispatch } from "redux";
import { CreationType } from "../cards/model";
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

export const setHoveredCard = (cardID: string, field: CreationType) => {
	return { payload: { id: cardID, field }, type: t.RIVER_HOVERED_CARD };
};

export const trySetHoveredCard = (cardID: string, field: CreationType) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const hoveredCardData = getHoveredCardData(state);
		if (hoveredCardData.id !== cardID || hoveredCardData.field !== field) dispatch(setHoveredCard(cardID, field));
	};
};
