import * as t from "./actionTypes";
import { CardType, CreationType } from "../cards/model/model";
import { CardOrigin, SingleOrigin, AOnlyQAOrigin, QOnlyQAOrigin } from "../cards/model/model-origin";
import cards from "../cards";
import focus from "../focus";
import { getCurrentSelectedString, getCurrentSelectedParent, getContextMenuState, getCurrentOrigin } from "./selectors";
import { isNullOrUndefined } from "util";
import display from "../display";
import river from "../river";

export const toggleContextMenu = () => {
	return (dispatch: any, getState: Function) => {
		const state = getState();
		if (display.selectors.getDataExists(state)) {
			dispatch({ type: t.TOGGLE_CONTEXT_MENU });
			dispatch(focus.actions.toggleContextMenuFocus());
		}
	};
};

export const closeContextMenu = () => {
	return (dispatch: any, getState: Function) => {
		if (getContextMenuState(getState())) {
			dispatch({ type: t.CLOSE_CONTEXT_MENU });
			dispatch(focus.actions.updateFocus("DOCUMENT"));
		}
	};
};

export const openContextMenu = () => {
	return (dispatch: any) => {
		dispatch({ type: t.OPEN_CONTEXT_MENU });
		dispatch(focus.actions.updateFocus("DOCUMENT"));
	};
};

export const grabSelectionForContextMenu = (type: CardType, creationType: CreationType, cardID?: string) => {
	return (dispatch: Function, getState: Function) => {
		dispatch(closeContextMenu());

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
			// need to transform it because we can create als QA-Cards from document
			transformedOrigin = cards.services.transformInputOrigin(
				origin,
				"note",
				creationType,
				isUpdate ? (cards.selectors.getCards(state)[cardID as string].origin as CardOrigin) : undefined
			);
			console.log(origin, transformedOrigin);
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

export const hasNonEmptyOrigin = (origin?: CardOrigin) =>
	!!origin &&
	(!isNullOrUndefined((origin as SingleOrigin).spanIndex) ||
		!isNullOrUndefined((origin as AOnlyQAOrigin).a?.spanIndex) ||
		!isNullOrUndefined((origin as QOnlyQAOrigin).q?.spanIndex));

export const grabSelectionForSourceMenu = (
	type: CardType,
	creationType: CreationType,
	sourceField: CreationType,
	origin?: CardOrigin,
	cardID?: string
) => {
	return (dispatch: Function, getState: Function) => {
		dispatch(closeContextMenu());

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
		dispatch(river.actions.resetSourceCard());
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
