import * as t from "./actionTypes";
import { riverShowStateIsShow, getActiveRiverMakeUpID } from "./selectors";
import { Dispatch } from "redux";
import { RiverContentState, ContentFilter, RiverMakeUps } from "./model";
import { SingleOrigin } from "../cards/model/origin";
import { ClayMemoryPayloadAction } from "../../shared/utils";
import { createAction } from "@reduxjs/toolkit";

export const toggleRiverShowState = () => (dispatch: Dispatch, getState: Function) => {
	dispatch({
		type: t.RIVER_SHOW_STATE,
		payload: riverShowStateIsShow(getState()) ? "HIDE" : "SHOW",
	} as ClayMemoryPayloadAction);
};

export const setRiverContentState = (state: RiverContentState): ClayMemoryPayloadAction => {
	return { type: t.RIVER_CONTENT_STATE, payload: state };
};

export const setActiveRiver = (id: string): ClayMemoryPayloadAction => {
	return { type: t.RIVER_ACTIVE_ID, payload: id };
};

export const trySetActiveRiver = (id: string) => {
	return (dispatch: Dispatch, getState: Function) => {
		if (getActiveRiverMakeUpID(getState()) !== id) dispatch(setActiveRiver(id));
	};
};

export const setContentFilter = (filter: ContentFilter): ClayMemoryPayloadAction => {
	return { type: t.RIVER_CONTENT_FILTER, payload: filter };
};

export const resetContentFilter = (): ClayMemoryPayloadAction => {
	return { type: t.RIVER_CONTENT_FILTER, payload: "" };
};

export const setOriginRequest = (origin: SingleOrigin | null): ClayMemoryPayloadAction => {
	return { type: t.ORIGIN_REQUEST, payload: origin };
};

export const resetOriginRequest = () => {
	return setOriginRequest(null);
};

export const resetRivers = createAction(t.RIVER_RESET);
export const replaceRivers = (makeUps: RiverMakeUps) => {
	return { type: t.RIVER_REPLACE, payload: makeUps };
};
