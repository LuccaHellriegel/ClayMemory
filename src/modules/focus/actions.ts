import * as t from "./actionTypes";
import { UserFocus, DisplayFocus } from "./model";
import { Dispatch } from "redux";
import { getFocus } from "./selectors";

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
		const currentFocus = getFocus(getState());
		switch (currentFocus) {
			case "CONTEXT_MENU":
				dispatch(updateFocus("DOCUMENT"));
				break;
			case "DOCUMENT":
				dispatch(updateFocus("CONTEXT_MENU"));
				break;
		}
	};
};

export const updateDisplayFocus = (focus: DisplayFocus) => {
	return { type: t.DISPLAY_FOCUS_UPDATE, payload: focus };
};
