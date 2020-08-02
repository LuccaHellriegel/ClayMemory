import * as t from "./actionTypes";
import { Dispatch } from "redux";
import analyze from "../analyze";
import select from "../select";
import river from "../river";
import { CardType } from "../river/model";
import { selectedStringToConfig } from "./services/selectedStringToConfig";
import { CreationType } from "./model";

export const toggleContextMenu = () => {
	return (dispatch: Dispatch, getState: Function) => {
		if (analyze.selectors.getDataExists(getState())) dispatch({ type: t.TOGGLE_CONTEXT_MENU });
	};
};

export const closeContextMenu = () => {
	return { type: t.CLOSE_CONTEXT_MENU };
};

export const triggerSelectionGrab = (
	riverIndex: string,
	type: CardType,
	creationType: CreationType,
	cardIndex?: number
) => {
	return (dispatch: Dispatch, getState: Function) => {
		//TODO
		const updateType = "REPLACE";

		const selectedString = select.selectors.getCurrentSelectedString(getState());

		const isUpdate = cardIndex !== undefined;

		if (isUpdate) {
			const state = getState();

			const currentCard = river.selectors.getRiverMakeUps(state)[riverIndex].cards[cardIndex as number];
			const config = selectedStringToConfig(selectedString, type, creationType, updateType, currentCard);

			dispatch(
				river.actions.cardRiverUpdate({
					id: riverIndex,
					card: config,
				})
			);
		} else {
			const config = selectedStringToConfig(selectedString, type, creationType, updateType);
			dispatch(river.actions.cardRiverPush({ id: riverIndex, card: config }));
		}

		dispatch(closeContextMenu());
	};
};
