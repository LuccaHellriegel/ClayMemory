import creation from "../../creation";
import focus from "../../focus";

export const mouseDownControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();
		const contextMenuState = creation.selectors.getContextMenuState(state);
		if (contextMenuState) {
			const clickOutSideOfMenu = !creation.utils.contextMenuContainsTargetNode(state, event);

			if (clickOutSideOfMenu) {
				dispatch(creation.actions.closeContextMenu());
			}
		}
	};
};

export const mouseUpControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const selection = document.getSelection();
		if (selection) {
			const selectedStr = selection.toString();
			if (selectedStr !== "") {
				const state = getState();
				const userFocus = focus.selectors.getFocus(state);
				if (userFocus === "SELECTION" || userFocus === "EDITOR") {
					dispatch(creation.actions.selectedParent(selection.anchorNode?.parentNode as HTMLSpanElement));
					dispatch(creation.actions.updateManuallySelectedString(selectedStr));
					dispatch(creation.actions.updateSelectionPosition(event.x, event.y));
					dispatch(creation.actions.openContextMenu());
				}
			}
		}
	};
};
