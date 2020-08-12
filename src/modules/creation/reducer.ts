import * as t from "./actionTypes";
import { CreationData } from "./model";
import { createRef } from "react";
import { CardPayload } from "../cards/model";
import cards from "../cards";

const initialState: CreationData = {
	open: false,
	menuRef: createRef(),
	qaRefs: [createRef(), createRef()],
	manuallySelectedString: "",
	selectedParentSpan: null,
	selectionPosition: { x: 0, y: 0 },
};

const creationData = (state = initialState, { type, payload }: { type: string; payload: any }): CreationData => {
	switch (type) {
		case t.TOGGLE_CONTEXT_MENU:
			return { ...state, open: !state.open };
		case t.CLOSE_CONTEXT_MENU:
			return { ...state, open: false };
		case t.OPEN_CONTEXT_MENU:
			return { ...state, open: true };
		case cards.actionTypes.CARD_PUSH:
			//TODO: state from local storage does not have all the refs
			//TODO: reliance on order of refs and coupling to the fact that a new card was pushed
			// no support for multiple rivers
			if ((payload as CardPayload).card.type === "Q-A") return { ...state, qaRefs: [...state.qaRefs, createRef()] };
			return state;
		case t.SELECTED_STRING:
			return { ...state, manuallySelectedString: payload as string };
		case t.SELECTED_PARENT:
			return { ...state, selectedParentSpan: payload };
		case t.SELECTION_POSITION:
			return { ...state, selectionPosition: payload };
		default:
			return state;
	}
};

export default creationData;
