import * as t from "./actionTypes";
import { SelectionData } from "./model";

const initialState: SelectionData = {
	sourceConfig: null,
	goalConfig: null,
};

const selectionData = (state = initialState, { type, payload }: { type: string; payload: any }): SelectionData => {
	switch (type) {
		case t.SELECTION_SOURCE:
			return { ...state, sourceConfig: payload };
		case t.SELECTION_GOAL:
			return { ...state, goalConfig: payload };
		default:
			return state;
	}
};

export default selectionData;
