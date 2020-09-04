import * as t from "./actionTypes";
import { CardOrigin } from "../cards/model/model-origin";
import { getSourceCard } from "./selectors";
import { Dispatch } from "redux";
import { CardField } from "../cards/model/model-content";
import { isDifferentSourceCard } from "./model";

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
	return { type: t.DOCUMENT_POSITION, payload: { x, y } };
};

export const setSourceCard = (sourceField: CardField, origin?: CardOrigin) => {
	return { type: t.SOURCE_CARD, payload: { origin, sourceField } };
};

export const trySetSourceCard = (sourceField: CardField, origin?: CardOrigin) => {
	return (dispatch: Dispatch, getState: Function) => {
		const sourceCard = getSourceCard(getState());
		if (isDifferentSourceCard(sourceCard, sourceField, origin)) dispatch(setSourceCard(sourceField, origin));
	};
};

export const resetSourceCard = () => {
	return { type: t.SOURCE_CARD, payload: null };
};

export const tryResetSourceCard = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const sourceCardExits = getSourceCard(getState()) !== null;
		if (sourceCardExits) dispatch(resetSourceCard());
	};
};
