import * as t from "./actionTypes";
import { riverShowStateIsShow, getActiveRiverMakeUpID } from "./selectors";
import { Dispatch } from "redux";
import { RiverContentState, ContentFilter } from "./model";
import { SingleOrigin } from "../cards/model/origin";

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

export const setContentFilter = (filter: ContentFilter) => {
	return { type: t.RIVER_CONTENT_FILTER, payload: filter };
};

export const resetContentFilter = () => {
	return { type: t.RIVER_CONTENT_FILTER, payload: "" };
};

export const setOriginRequest = (origin: SingleOrigin | null) => {
	return { type: t.ORIGIN_REQUEST, payload: origin };
};

export const resetOriginRequest = () => {
	return setOriginRequest(null);
};
