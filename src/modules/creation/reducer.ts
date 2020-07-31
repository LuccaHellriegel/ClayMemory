import * as t from "./actionTypes";
import { CreationData } from "./model";
import { createRef } from "react";

const initialState: CreationData = { open: false, menuRef: createRef() };

const creationData = (state = initialState, { type, payload }: { type: string; payload: any }): CreationData => {
	switch (type) {
		case t.TOGGLE_CONTEXT_MENU:
			return { ...state, open: !state.open };
		case t.CLOSE_CONTEXT_MENU:
			return { ...state, open: false };
		default:
			return state;
	}
};

export default creationData;
