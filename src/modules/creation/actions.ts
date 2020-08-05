import * as t from "./actionTypes";
import { Dispatch } from "redux";
import analyze from "../analyze";
import select from "../select";
import river from "../river";
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
	return (dispatch: Dispatch, getState: Function) => {
		dispatch(closeContextMenu());

		//TODO
		const updateType = "REPLACE";

		const selectedString = select.selectors.getCurrentSelectedString(getState());
		const isUpdate = cardID !== undefined;

		if (isUpdate) {
			const state = getState();

			const currentCard = river.selectors.getCards(state)[cardID as string];
			const config = cards.services.selectedStringToConfig(selectedString, type, creationType, updateType, currentCard);

			dispatch(
				cards.actions.cardUpdate({
					riverID,
					card: config,
				})
			);
		} else {
			const config = cards.services.selectedStringToConfig(selectedString, type, creationType, updateType);
			dispatch(cards.actions.cardPush({ riverID, card: config }));
		}
	};
};
