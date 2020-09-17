import * as t from "./actionTypes";
import { CreationData } from "./model";
import { createRef } from "react";
import cards from "../cards";
import { CardConfig } from "../cards/model/model-config";

const initialState: CreationData = {
	menuRef: createRef(),
	fullCardRef: createRef(),
	qaRefs: [createRef(), createRef()],
	position: null,
};

const creationData = (state = initialState, { type, payload }: { type: string; payload: any }): CreationData => {
	switch (type) {
		case t.CLOSE_CONTEXT_MENU:
			return { ...state, position: null };
		case t.OPEN_CONTEXT_MENU:
			return { ...state, position: payload };
		case cards.actionTypes.CARD_PUSH:
			//TODO-NICE: reliance on order of refs (needs to be the same as order of qaRefs) and coupling to the fact that a new card was pushed
			// might need to change if I allow moving the cards
			//TODO-NICE: no support for multiple rivers
			// need to check cards, this could lead to unnecessary amounts of refs because I dont check if enough are ready
			if ((payload as CardConfig).type === "Q-A") return { ...state, qaRefs: [...state.qaRefs, createRef()] };
			return state;
		default:
			return state;
	}
};

export default creationData;