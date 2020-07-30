import * as t from "./actionTypes";
import { Dispatch } from "redux";
import analyze from "../../material/analyze";
import select from "../../material/select";
import river from "../river";
import { CardType } from "../river/model";

export const toggleContextMenu = () => {
	return (dispatch: Dispatch, getState: Function) => {
		if (analyze.utils.getDataExists(getState())) dispatch({ type: t.TOGGLE_CONTEXT_MENU });
	};
};

export const closeContextMenu = () => {
	return { type: t.CLOSE_CONTEXT_MENU };
};

export const triggerSelectionGrab = (riverIndex: number, type: CardType, cardIndex?: number) => {
	return (dispatch: Dispatch, getState: Function) => {
		const selectedString = select.selectors.getCurrentSelectedString(getState());

		type = "Note";

		if (cardIndex !== undefined) {
			dispatch(
				river.actions.cardRiverUpdate({
					index: riverIndex,
					card: { cardIndex, content: selectedString, type },
				})
			);
		} else {
			dispatch(river.actions.cardRiverPush(riverIndex, { index: riverIndex, card: { content: selectedString, type } }));
		}

		dispatch(closeContextMenu());
	};
};
