import * as t from "./actionTypes";
import { CardType, CreationType, CardOrigin } from "../cards/model";
import cards from "../cards";
import focus from "../focus";
import { getCurrentSelectedString, getCurrentSelectedParent } from "./selectors";
import display from "../display";

export const toggleContextMenu = () => {
	return (dispatch: any) => {
		dispatch({ type: t.TOGGLE_CONTEXT_MENU });
		dispatch(focus.actions.toggleContextMenuFocus());
	};
};

export const closeContextMenu = () => {
	return (dispatch: any) => {
		dispatch({ type: t.CLOSE_CONTEXT_MENU });
		dispatch(focus.actions.updateFocus("SELECTION"));
	};
};

export const openContextMenu = () => {
	return (dispatch: any) => {
		dispatch({ type: t.OPEN_CONTEXT_MENU });
		dispatch(focus.actions.updateFocus("SELECTION"));
	};
};

export const triggerSelectionGrab = (riverID: string, type: CardType, creationType: CreationType, cardID?: string) => {
	return (dispatch: Function, getState: Function) => {
		dispatch(closeContextMenu());

		const state = getState();

		const updateType = type === "Q-A" ? "REPLACE" : "APPEND";

		const selectedString = getCurrentSelectedString(state);
		const isUpdate = cardID !== undefined;

		//TODO: if selection is from card then copy card-origin
		const selectedParent = getCurrentSelectedParent(state);
		const origin: CardOrigin | undefined = selectedParent
			? {
					spanIndex: display.selectors.getSpanIndex(state, selectedParent),
					page: display.selectors.getCurrentPage(state),
			  }
			: undefined;

		if (isUpdate) {
			dispatch(
				cards.actions.updateCardContent(selectedString, cardID as string, creationType, updateType, riverID, origin)
			);
		} else {
			dispatch(cards.actions.pushCardContent(selectedString, creationType, updateType, riverID, type, origin));
		}
	};
};

export const updateManuallySelectedString = (str: string) => {
	return { type: t.SELECTED_STRING, payload: str };
};

export const resetManuallySelectedString = () => {
	return updateManuallySelectedString("");
};

export const selectedParent = (span: null | HTMLSpanElement) => {
	return { type: t.SELECTED_PARENT, payload: span };
};

export const updateSelectionPosition = (x: number, y: number) => {
	return { type: t.SELECTION_POSITION, payload: { x, y } };
};
