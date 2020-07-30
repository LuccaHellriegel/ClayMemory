import { Dispatch } from "redux";
import creation from "../../cards/creation";
import { toggleContextMenuFocus } from "../actions";

export const mouseControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();
		const contextMenuState = creation.selectors.getContextMenuState(state);
		if (contextMenuState) {
			const clickOutSideOfMenu = !creation.utils.contextMenuContainsTargetNode(state, event);

			if (clickOutSideOfMenu) {
				dispatch(toggleContextMenuFocus());
			}
		}
	};
};
