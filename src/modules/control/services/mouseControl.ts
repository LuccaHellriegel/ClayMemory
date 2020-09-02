import creation from "../../extraction";
import focus from "../../focus";
import cards from "../../cards";
import river from "../../river";
import { getSelectionText } from "../../../shared/utils";
import selection from "../../selection";

export const mouseDownControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const clickOutSideOfMenu = !creation.services.contextMenuContainsTargetNode(getState(), event);
		if (clickOutSideOfMenu) {
			dispatch(creation.actions.closeContextMenu());
		}
	};
};

export const mouseUpControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const selectionObject = document.getSelection();

		if (selectionObject) {
			const selectedStr = getSelectionText();

			if (selectedStr && selectedStr !== "") {
				const state = getState();
				const goalCard = cards.selectors.getGoalCard(state);
				const userFocus = focus.selectors.getFocus(state);

				const shouldGrab = userFocus === "RIVER" || userFocus === "DOCUMENT";

				if (goalCard && shouldGrab) {
					// this is the dispatch for the grab for field button
					//(which has been pressed before the mouse-up if goalCard is not null), here we actually update the goal card

					//TODO-NICE: allow grabbing from other cards
					// for now we dont allow grabbing from other cards to simplifiy the card->card workflow
					if (userFocus !== "RIVER")
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
					if (userFocus === "DOCUMENT") {
						dispatch(selection.actions.selectedParent(selectionObject.anchorNode?.parentNode as HTMLSpanElement));
						dispatch(selection.actions.updateManuallySelectedString(selectedStr));
					}

					// this is the dispatch to prepare for extraction from card
					if (userFocus === "RIVER") {
						dispatch(selection.actions.updateManuallySelectedString(selectedStr));
					}
				}
			}
		}
	};
};

//TODO-NICE: maybe also right-click in document?

//TODO-NICE: make selection-dropable on buttons, so that they can be send to cards, make this the default instead of context-menu?
// imagine: toolbar with new Note, new A, new Q | all the cards and you can drop off

//TODO-NICE: delete extracted str in source

export const rightClickControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();
		const userFocus = focus.selectors.getFocus(state);

		// this is set via left-click
		const selectedStr = selection.selectors.getCurrentSelectedString(state);

		if (selectedStr === "") return;

		event.preventDefault();

		// this is the dispatch for the ContextMenu inside the editor
		if (userFocus === "RIVER") {
			dispatch(selection.actions.updateSelectionPosition(event.x, event.y));
			dispatch(creation.actions.openContextMenu());
		}

		if (userFocus === "DOCUMENT") {
			//if the user is focused on the document, the push-to river should always be the active=page-wise river
			dispatch(river.actions.setPushToRiver(river.selectors.getActiveRiverMakeUpID(state)));

			dispatch(selection.actions.updateSelectionPosition(event.x, event.y));
			dispatch(creation.actions.openContextMenu());
		}
	};
};
