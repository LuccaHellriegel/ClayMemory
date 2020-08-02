import * as t from "./actionTypes";
import { Dispatch } from "redux";
import analyze from "../analyze";
import select from "../select";
import river from "../river";
import { CardType, CardConfig, CardContent, QACardContent } from "../river/model";

export const toggleContextMenu = () => {
	return (dispatch: Dispatch, getState: Function) => {
		if (analyze.selectors.getDataExists(getState())) dispatch({ type: t.TOGGLE_CONTEXT_MENU });
	};
};

export const closeContextMenu = () => {
	return { type: t.CLOSE_CONTEXT_MENU };
};

const selectedStringToContent = (str: string, type: CardType, currentCard?: CardConfig): CardContent => {
	switch (type) {
		case "Q-A":
			let qa;
			if (currentCard) {
				//TODO: does not support the case that we want to append
				qa = { ...(currentCard.content as QACardContent) };
				if (qa.a === "") {
					qa.a = str;
				} else {
					qa.q = str;
				}
			} else {
				qa = { q: str, a: "" };
			}
			return qa;
		default:
			return str;
	}
};

export const triggerSelectionGrab = (riverIndex: string, type: CardType, cardIndex?: number) => {
	return (dispatch: Dispatch, getState: Function) => {
		const selectedString = select.selectors.getCurrentSelectedString(getState());

		if (cardIndex !== undefined) {
			const state = getState();

			const currentCard = river.selectors.getRiverMakeUps(state)[riverIndex].cards[cardIndex];
			const newContent = selectedStringToContent(selectedString, type, currentCard);

			dispatch(
				river.actions.cardRiverUpdate({
					id: riverIndex,
					card: { cardIndex, content: newContent, type },
				})
			);
		} else {
			const newContent = selectedStringToContent(selectedString, type);
			dispatch(river.actions.cardRiverPush({ id: riverIndex, card: { content: newContent, type } }));
		}

		dispatch(closeContextMenu());
	};
};
