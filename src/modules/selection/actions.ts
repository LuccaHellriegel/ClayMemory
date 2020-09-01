import * as t from "./actionTypes";
import { CardType, CreationType } from "../cards/model/model";
import { CardOrigin, hasNonEmptyOrigin } from "../cards/model/model-origin";
import cards from "../cards";
import { getCurrentSelectedString, getCurrentSelectedParent, getCurrentOrigin } from "./selectors";

export const selectionToCard = (type: CardType, creationType: CreationType, cardID?: string) => {
	return (dispatch: Function, getState: Function) => {
		const state = getState();

		//TODO-NICE: think of a way to make this intuitive
		//const updateType = type === "Q-A" ? "REPLACE" : "APPEND";
		const updateType = "REPLACE";
		const isUpdate = cardID !== undefined;

		// this should be from the document
		const selectedString = getCurrentSelectedString(state);
		const selectedParent = getCurrentSelectedParent(state);

		// always overwrite origin, even if isUpdate, because updateType==replace
		const origin: CardOrigin | undefined = selectedParent ? getCurrentOrigin(state) : undefined;

		let transformedOrigin;
		if (origin) {
			// we exploit that the input from the document is always just a SingleOrigin=NoteOrigin
			// need to transform it because we can create also QA-Cards from document
			transformedOrigin = cards.services.transformInputOrigin(
				origin,
				"note",
				creationType,
				isUpdate ? (cards.selectors.getCards(state)[cardID as string].origin as CardOrigin) : undefined
			);
		}

		if (isUpdate) {
			dispatch(
				cards.actions.updateCardContent(
					selectedString,
					cardID as string,
					creationType,
					updateType,
					transformedOrigin as CardOrigin
				)
			);
		} else {
			dispatch(
				cards.actions.pushCardContent(selectedString, creationType, updateType, type, transformedOrigin as CardOrigin)
			);
		}

		dispatch(resetManuallySelectedString());
	};
};

export const selectionToCardForSourceCard = (
	type: CardType,
	creationType: CreationType,
	sourceField: CreationType,
	origin?: CardOrigin,
	cardID?: string
) => {
	return (dispatch: Function, getState: Function) => {
		const state = getState();

		const updateType = "REPLACE";
		const isUpdate = cardID !== undefined;

		//  this should be from the SourceCard in which the extract button has been clicked
		//	the SourceCard can or can not have an origin
		const sourceHasNonEmptyOrigin = hasNonEmptyOrigin(origin);
		const newOrigin = sourceHasNonEmptyOrigin
			? cards.services.transformInputOrigin(
					origin as CardOrigin,
					sourceField,
					creationType,
					isUpdate ? (cards.selectors.getCards(state)[cardID as string].origin as CardOrigin) : undefined
			  )
			: undefined;
		const selectedString = getCurrentSelectedString(state);

		//TODO-NICE: untangle the types so that the as CardOrigin is not necessary in the dispatch,
		//maybe merge content and origin to avoid two object hierarchies?
		if (isUpdate) {
			dispatch(
				cards.actions.updateCardContent(
					selectedString,
					cardID as string,
					creationType,
					updateType,
					newOrigin as CardOrigin
				)
			);
		} else {
			dispatch(cards.actions.pushCardContent(selectedString, creationType, updateType, type, newOrigin as CardOrigin));
		}

		dispatch(resetManuallySelectedString());
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
	return { type: t.DOCUMENT_POSITION, payload: { x, y } };
};
