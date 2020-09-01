import * as t from "./actionTypes";
import { SelectionData } from "./model";

const initialState: SelectionData = {
	manuallySelectedString: "",
	selectedParentSpan: null,
	selectionPosition: { x: 0, y: 0 },
};

const creationData = (state = initialState, { type, payload }: { type: string; payload: any }): SelectionData => {
	switch (type) {
		case t.SELECTED_STRING:
			return { ...state, manuallySelectedString: payload as string };
		case t.SELECTED_PARENT:
			return { ...state, selectedParentSpan: payload };
		case t.DOCUMENT_POSITION:
			return { ...state, selectionPosition: payload };
		default:
			return state;
	}
};

export default creationData;
