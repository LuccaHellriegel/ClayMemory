import { NAME } from "./constants";
import { SelectionData } from "./model";
import { createSelector } from "reselect";
import analyze from "../analyze";
import display from "../display";

export const getAll = (state: any) => state[NAME];

export const getSectionIndex = createSelector(getAll, (state: SelectionData) => state.sectionIndex);

export const getUpdateAllowed = createSelector(getAll, (state: SelectionData) => state.sectionUpdateAllowed);

export const getSectionMovementState = createSelector(getAll, (state: SelectionData) => state.sectionMovementState);

export const getCurrentSpanGroup = createSelector(
	analyze.selectors.getMaterialSpanGroups,
	getSectionIndex,
	(spanGroups, sectionIndex) => spanGroups[sectionIndex]
);

export const getCurrentBoundingRectGroup = createSelector(
	analyze.selectors.getMaterialBoundingRectGroups,
	getSectionIndex,
	(boundingRectGroups, sectionIndex) => boundingRectGroups[sectionIndex]
);

export const getCurrentBoundingRect = createSelector(getCurrentBoundingRectGroup, (group) => group[0]);

//TODO: position in store
export const getCurrentSelectionPosition = (state: SelectionData) => {
	return analyze.selectors.getDataExists(state) ? getCurrentBoundingRect(state) : { x: 0, y: 0 };
};
export const getCurrentSelectedString = createSelector(getAll, (state: SelectionData) => state.manuallySelectedString);

export const getSelectionType = createSelector(getAll, (state: SelectionData) => state.selectionType);

export const selectionTypeIsSection = createSelector(getSelectionType, (type) => type === "SECTION");

export const getOverlayRelevantData = createSelector(
	getCurrentSpanGroup,
	getSectionMovementState,
	display.selectors.getDocumentRef,
	(spanGroup, movementState, documentRef) => {
		return { spanGroup, movementState, documentRef };
	}
);
