import { SelectionData, SelectionType } from "./model";
import * as t from "./actionTypes";
import analyze from "../analyze";
import display from "../display";

//TODO: prerender next few pages?

//TODO: state per page

//TODO: Second CardRiver, where you can choose the page! (for comparison)

const initialState: SelectionData = {
	sectionIndex: 1,
	sectionUpdateAllowed: false,
	sectionMovementState: "FREE",
	selectionType: "MOUSE",
	manuallySelectedString: "",
};

const disableSectionUpdate = (state: SelectionData) => {
	return { ...state, sectionUpdateAllowed: false };
};
const resetSectionSelection = (state: SelectionData) => {
	return { ...state, sectionIndex: 0, sectionUpdateAllowed: true };
};

const selectionData = (state = initialState, { type, payload }: { type: string; payload: any }): SelectionData => {
	switch (type) {
		case t.SECTION_UPDATE:
			return { ...state, sectionIndex: payload as number };
		case t.SECTION_STATE:
			return { ...state, sectionMovementState: state.sectionMovementState === "FREE" ? "LOCKED" : "FREE" };
		case display.actionTypes.PAGE_UPDATE:
			return disableSectionUpdate(state);
		case analyze.actionTypes.MATERIAL_DATA:
			return resetSectionSelection(state);
		case t.SELECTION_TYPE:
			return { ...state, selectionType: payload as SelectionType };
		case t.SELECTED_STRING:
			return { ...state, manuallySelectedString: payload as string };
		default:
			return state;
	}
};

export default selectionData;
