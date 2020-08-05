import * as t from "./actionTypes";
import { ControlFocus } from "./model";
import { Dispatch } from "redux";
import { getFocus } from "./selectors";
import analyze from "../analyze";
import creation from "../creation";

export const updateFocus = (focus: ControlFocus) => {
	return { type: t.FOCUS_UPDATE, payload: focus };
};

export const tryUpdateFocus = (focus: ControlFocus) => {
	return (dispatch: Dispatch, getState: Function) => {
		if (getFocus(getState()) !== focus) dispatch(updateFocus(focus));
	};
};

export const toggleContextMenuFocus = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		if (analyze.selectors.getDataExists(state)) {
			const currentFocus = getFocus(getState());
			switch (currentFocus) {
				case "CONTEXT_MENU":
					dispatch(creation.actions.closeContextMenu());
					dispatch(updateFocus("SELECTION"));
					break;
				case "SELECTION":
					dispatch(updateFocus("CONTEXT_MENU"));
					break;
			}
		}
	};
};
