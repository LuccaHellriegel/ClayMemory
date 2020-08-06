import * as t from "./actionTypes";
import { riverShowStateIsShow } from "./selectors";
import { Dispatch } from "redux";

export const toggleRiverShowState = () => (dispatch: Dispatch, getState: Function) => {
	dispatch({ type: t.RIVER_SHOW_STATE, payload: riverShowStateIsShow(getState()) ? "HIDE" : "SHOW" });
};
