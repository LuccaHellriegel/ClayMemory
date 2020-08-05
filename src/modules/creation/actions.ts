import * as t from "./actionTypes";
import { Dispatch } from "redux";
import analyze from "../analyze";
import select from "../select";
import { CardType, CreationType } from "../cards/model";
import cards from "../cards";

export const toggleContextMenu = () => {
	return (dispatch: Dispatch, getState: Function) => {
		if (analyze.selectors.getDataExists(getState())) dispatch({ type: t.TOGGLE_CONTEXT_MENU });
	};
};

export const closeContextMenu = () => {
	return { type: t.CLOSE_CONTEXT_MENU };
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
