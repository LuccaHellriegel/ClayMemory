import creation from "../../creation";
import focus from "../../focus";

export const mouseControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();
		const contextMenuState = creation.selectors.getContextMenuState(state);
		if (contextMenuState) {
			const clickOutSideOfMenu = !creation.utils.contextMenuContainsTargetNode(state, event);

			if (clickOutSideOfMenu) {
				dispatch(focus.actions.toggleContextMenuFocus());
				dispatch(creation.actions.toggleContextMenu());
			}
		}
	};
};
