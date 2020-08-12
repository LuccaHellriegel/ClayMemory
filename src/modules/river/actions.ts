import * as t from "./actionTypes";
import { riverShowStateIsShow, getPushToRiver } from "./selectors";
import { Dispatch } from "redux";

export const toggleRiverShowState = () => (dispatch: Dispatch, getState: Function) => {
	dispatch({ type: t.RIVER_SHOW_STATE, payload: riverShowStateIsShow(getState()) ? "HIDE" : "SHOW" });
};

export const setPushToRiver = (id: string) => {
	return { type: t.RIVER_PUSH_STATE, payload: id };
};

export const trySetPushToRiver = (id: string) => {
	return (dispatch: Dispatch, getState: Function) => {
		if (getPushToRiver(getState()) !== id) dispatch(setPushToRiver(id));
	};
};
