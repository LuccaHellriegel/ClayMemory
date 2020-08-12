import * as t from "./actionTypes";
import { UserFocus } from "./model";
import { Dispatch } from "redux";
import { getFocus } from "./selectors";
import display from "../display";

export const updateFocus = (focus: UserFocus) => {
	return { type: t.FOCUS_UPDATE, payload: focus };
};

export const tryUpdateFocus = (focus: UserFocus) => {
	return (dispatch: Dispatch, getState: Function) => {
		if (getFocus(getState()) !== focus) dispatch(updateFocus(focus));
	};
};

export const toggleContextMenuFocus = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		if (display.selectors.getDataExists(state)) {
			const currentFocus = getFocus(getState());
			switch (currentFocus) {
				case "CONTEXT_MENU":
					dispatch(updateFocus("SELECTION"));
					break;
				case "SELECTION":
					dispatch(updateFocus("CONTEXT_MENU"));
					break;
			}
		}
	};
};
