import * as t from "./actionTypes";
import { CreationData } from "./model";
import { createRef } from "react";
import river from "../river";
import { CardPayload } from "../cards/model";

const initialState: CreationData = { open: false, menuRef: createRef(), qaRefs: [createRef(), createRef()] };

const creationData = (state = initialState, { type, payload }: { type: string; payload: any }): CreationData => {
	switch (type) {
		case t.TOGGLE_CONTEXT_MENU:
			return { ...state, open: !state.open };
		case t.CLOSE_CONTEXT_MENU:
			return { ...state, open: false };
		case river.actionTypes.CARD_RIVER_PUSH:
			//TODO: reliance on order of refs and coupling to the fact that a new card was pushed
			// no support for multiple rivers
			if ((payload as CardPayload).card.type === "Q-A") return { ...state, qaRefs: [...state.qaRefs, createRef()] };
		default:
			return state;
	}
};

export default creationData;
