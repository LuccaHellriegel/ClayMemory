import * as t from "./actionTypes";
import { Dispatch } from "redux";
import material from "../../material";

export const toggleContextMenu = () => {
	return (dispatch: Dispatch, getState: Function) => {
		if (material.analyze.utils.getDataExists(getState())) dispatch({ type: t.TOGGLE_CONTEXT_MENU });
	};
};

export const closeContextMenu = () => {
	return { type: t.CLOSE_CONTEXT_MENU };
};