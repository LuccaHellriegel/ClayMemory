import * as t from "./actionTypes";
import { SelectionData } from "./model";

const initialState: SelectionData = {
	manuallySelectedString: "",
	selectedParentSpan: null,
	selectionPosition: { x: 0, y: 0 },
	sourceCard: null,
};

const selectionData = (state = initialState, { type, payload }: { type: string; payload: any }): SelectionData => {
	switch (type) {
		case t.SELECTED_STRING:
			return { ...state, manuallySelectedString: payload as string };
		case t.SELECTED_PARENT:
			// we toggle between sourceCard and selectedParentSpan because they cant co-exist

			return { ...state, sourceCard: null, selectedParentSpan: payload };
		case t.DOCUMENT_POSITION:
			return { ...state, selectionPosition: payload };
		case t.SOURCE_CARD:
			return { ...state, sourceCard: payload, selectedParentSpan: null };
		default:
			return state;
	}
};

export default selectionData;
