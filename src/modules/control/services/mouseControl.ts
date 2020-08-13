import creation from "../../creation";
import focus from "../../focus";
import cards from "../../cards";
import river from "../../river";

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

				const shouldGrab = userFocus === "EDITOR" || userFocus === "SELECTION";

				if (goalCard && shouldGrab) {
					// this is the dispatch for the grab for field button
					//(which has been pressed before the mouse-up if goalCard is not null), here we actually update the goal card

					//TODO-RC: what if another card is the source?
					//We actually want to copy that origin or get the new origin, if we select from the document
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
					// this is the dispatch for the ContextMenu
					if (userFocus === "SELECTION") {
						//if the user is focused on the document, the push-to river should always be the active=page-wise river
						dispatch(river.actions.setPushToRiver(river.selectors.getActiveRiverMakeUpID(state)));
						dispatch(creation.actions.selectedParent(selection.anchorNode?.parentNode as HTMLSpanElement));
						dispatch(creation.actions.updateManuallySelectedString(selectedStr));
						dispatch(creation.actions.updateSelectionPosition(event.x, event.y));
						dispatch(creation.actions.openContextMenu());
					}

					// this is the dispatch to prepare for extraction from card
					if (userFocus === "EDITOR") {
						dispatch(creation.actions.updateManuallySelectedString(selectedStr));
					}
				}
			}
		}
	};
};
