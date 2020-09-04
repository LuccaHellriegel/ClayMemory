import * as t from "./actionTypes";
import { getContextMenuState } from "./selectors";
import display from "../display";
import selection from "../selection";
import { CardOrigin } from "../cards/model/model-origin";
import { CreationType } from "../cards/model/model-config";
import { contextMenuContainsTargetNode } from "./services";
import river from "../river";
import focus from "../focus";

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

export const mouseDownControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const clickOutSideOfMenu = !contextMenuContainsTargetNode(getState(), event);
		if (clickOutSideOfMenu) {
			dispatch(closeContextMenu());
			dispatch(river.actions.resetHoveredCard());
		}
	};
};

export const rightClickControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();

		if (!selection.selectors.currentSelectionExists(state)) return;

		event.preventDefault();

		const displayFocus = focus.selectors.getDisplayFocus(state);

		dispatch(selection.actions.updateSelectionPosition(event.x, event.y));
		dispatch(openContextMenu());

		if (displayFocus === "ACTIVE_RIVER") {
			//if the user is focused on the document, the push-to river should always be the active=page-wise river
			dispatch(river.actions.setPushToRiver(river.selectors.getActiveRiverMakeUpID(state)));
		}
	};
};

export const dispatchCreationFromContextMenu = (creationType: CreationType, cardID?: string) => {
	return (dispatch: any, getState: Function) => {
		dispatch(closeContextMenu());

		const state = getState();
		// if this does exist, we dont need to provide an origin, because it will be provided by the sourceCard
		const sourceCard = selection.selectors.getSourceCard(state);
		// always overwrite origin, even if isUpdate, because updateType==replace
		const origin: CardOrigin | undefined = sourceCard ? undefined : display.selectors.getCurrentOrigin(state);
		dispatch(selection.services.use_selection.selectionToCardReplace(creationType, origin, cardID));
	};
};
