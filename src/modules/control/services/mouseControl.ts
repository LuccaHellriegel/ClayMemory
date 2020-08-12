import creation from "../../creation";
import focus from "../../focus";
import cards from "../../cards";

export const mouseDownControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();
		// the menu-ref is used for all drop-down menus, so this closes all of them
		const clickOutSideOfMenu = !creation.utils.contextMenuContainsTargetNode(state, event);
		if (clickOutSideOfMenu) {
			dispatch(cards.actions.tryResetSourceCard());
			dispatch(creation.actions.closeContextMenu());
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
				const goalCard = cards.selectors.getGoalCard(state);
				const userFocus = focus.selectors.getFocus(state);

				if (goalCard && (userFocus === "EDITOR" || userFocus === "SELECTION")) {
					console.log(event.target);
					dispatch(
						cards.actions.updateCardContent(
							selectedStr,
							goalCard.cardID,
							goalCard.creationType,
							"REPLACE",
							goalCard.origin
						)
					);
					dispatch(cards.actions.resetGoalCard());
				} else {
					if (userFocus === "SELECTION") {
						dispatch(creation.actions.selectedParent(selection.anchorNode?.parentNode as HTMLSpanElement));
						dispatch(creation.actions.updateManuallySelectedString(selectedStr));
						dispatch(creation.actions.updateSelectionPosition(event.x, event.y));
						dispatch(creation.actions.openContextMenu());
					}

					if (userFocus === "EDITOR") {
						dispatch(creation.actions.selectedParent(selection.anchorNode?.parentNode as HTMLSpanElement));
						dispatch(creation.actions.updateManuallySelectedString(selectedStr));
					}
				}
			}
		}
	};
};
