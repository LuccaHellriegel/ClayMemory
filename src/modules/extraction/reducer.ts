import * as t from "./actionTypes";
import { CreationData } from "./model";
import { createRef } from "react";

const initialState: CreationData = {
	menuRef: createRef(),
	position: null,
};

const creationData = (state = initialState, { type, payload }: { type: string; payload: any }): CreationData => {
	switch (type) {
		case t.CLOSE_CONTEXT_MENU:
			return { ...state, position: null };
		case t.OPEN_CONTEXT_MENU:
			return { ...state, position: payload };
		default:
			return state;
	}
};

export default creationData;
