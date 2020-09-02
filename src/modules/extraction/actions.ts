import * as t from "./actionTypes";
import { getContextMenuState } from "./selectors";
import display from "../display";

export const toggleContextMenu = () => {
	return (dispatch: any, getState: Function) => {
		const state = getState();
		if (display.selectors.getDataExists(state)) {
			dispatch({ type: t.TOGGLE_CONTEXT_MENU });
		}
	};
};

export const closeContextMenu = () => {
	return (dispatch: any, getState: Function) => {
		if (getContextMenuState(getState())) {
			dispatch({ type: t.CLOSE_CONTEXT_MENU });
		}
	};
};

export const openContextMenu = () => {
	return (dispatch: any) => {
		dispatch({ type: t.OPEN_CONTEXT_MENU });
	};
};
