import creation from "../../extraction";
import focus from "../../focus";
import river from "../../river";
import selection from "../../selection";

export const mouseDownControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const clickOutSideOfMenu = !creation.services.contextMenuContainsTargetNode(getState(), event);
		if (clickOutSideOfMenu) {
			dispatch(creation.actions.closeContextMenu());
			dispatch(river.actions.resetHoveredCard());
		}
	};
};

//TODO-NICE: make selection-dropable on buttons, so that they can be send to cards, make this the default instead of context-menu?
// imagine: toolbar with new Note, new A, new Q | all the cards and you can drop off

//TODO-NICE: delete extracted str in source

export const rightClickControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();

		// this is set via left-click
		const selectedStr = selection.selectors.getCurrentSelectedString(state);

		const displayFocus = focus.selectors.getDisplayFocus(state);

		if (selectedStr === "") return;

		event.preventDefault();

		dispatch(selection.actions.updateSelectionPosition(event.x, event.y));
		dispatch(creation.actions.openContextMenu());

		if (displayFocus === "ACTIVE_RIVER") {
			//if the user is focused on the document, the push-to river should always be the active=page-wise river
			dispatch(river.actions.setPushToRiver(river.selectors.getActiveRiverMakeUpID(state)));
		}
	};
};
