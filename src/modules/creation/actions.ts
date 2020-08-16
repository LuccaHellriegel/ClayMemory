import * as t from "./actionTypes";
import { CardType, CreationType, CardOrigin, QAOrigin, SingleOrigin } from "../cards/model";
import cards from "../cards";
import focus from "../focus";
import { getCurrentSelectedString, getCurrentSelectedParent, getContextMenuState, getCurrentOrigin } from "./selectors";
import { isNullOrUndefined } from "util";
import { transformInputOrigin } from "./services/transformInputOrigin";
import display from "../display";

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
			dispatch(focus.actions.updateFocus("SELECTION"));
		}
	};
};

export const openContextMenu = () => {
	return (dispatch: any) => {
		dispatch({ type: t.OPEN_CONTEXT_MENU });
		dispatch(focus.actions.updateFocus("SELECTION"));
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

		if (isUpdate) {
			dispatch(cards.actions.updateCardContent(selectedString, cardID as string, creationType, updateType, origin));
		} else {
			dispatch(cards.actions.pushCardContent(selectedString, creationType, updateType, type, origin));
		}
	};
};

export const hasNonEmptyOrigin = (origin?: CardOrigin) =>
	!!origin &&
	(!isNullOrUndefined((origin as SingleOrigin).spanIndex) ||
		!isNullOrUndefined((origin as QAOrigin).a?.spanIndex) ||
		!isNullOrUndefined((origin as QAOrigin).q?.spanIndex));

export const grabSelectionForSourceMenu = (
	type: CardType,
	creationType: CreationType,
	sourceField: CreationType,
	origin?: CardOrigin,
	cardID?: string
) => {
	return (dispatch: Function, getState: Function) => {
		// this is called, after the source-card has been set, the SourceMenu has been opened and been clicked
		const state = getState();

		// close SourceMenu by resetting SourceCard
		dispatch(cards.actions.resetSourceCard());

		const updateType = "REPLACE";
		const isUpdate = cardID !== undefined;

		//  this should be from the SourceCard in which the extract button has been clicked
		//	the SourceCard can or can not have an origin
		const sourceHasNonEmptyOrigin = hasNonEmptyOrigin(origin);
		const newOrigin = sourceHasNonEmptyOrigin
			? transformInputOrigin(
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
