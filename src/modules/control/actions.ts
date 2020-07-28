import * as t from "./actionTypes";
import { ControlFocus } from "./model";
import { Dispatch } from "redux";
import { getFocus } from "./selectors";

export const updateFocus = (focus: ControlFocus) => {
	return { type: t.FOCUS_UPDATE, payload: focus };
};

export const toggleContextMenuFocus = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const currentFocus = getFocus(getState());
		switch (currentFocus) {
			case "CONTEXT_MENU":
				dispatch(updateFocus("SELECTION"));
				break;
			case "SELECTION":
				dispatch(updateFocus("CONTEXT_MENU"));
				break;
		}
	};
};
