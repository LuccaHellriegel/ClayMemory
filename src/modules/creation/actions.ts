import * as t from "./actionTypes";
import select from "../select";
import { CardType, CreationType } from "../cards/model";
import cards from "../cards";
import focus from "../focus";

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

		//TODO
		const updateType = "REPLACE";

		const selectedString = select.selectors.getCurrentSelectedString(getState());
		const isUpdate = cardID !== undefined;

		if (isUpdate) {
			dispatch(cards.actions.updateCardContent(selectedString, cardID as string, creationType, updateType, riverID));
		} else {
			dispatch(cards.actions.pushCardContent(selectedString, creationType, updateType, riverID, type));
		}
	};
};
