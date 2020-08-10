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

export const getCurrentSelectionGroup = createSelector(
	analyze.selectors.getWordSelectionGroups,
	getSectionIndex,
	(selectionGroups, sectionIndex) => selectionGroups[sectionIndex]
);

export const getCurrentWordRangeGroup = createSelector(
	analyze.selectors.getWordRangeGroups,
	getSectionIndex,
	(wordRangeGroups, sectionIndex) => wordRangeGroups[sectionIndex]
);

export const getCurrentSelectedWordRanges = createSelector(
	getCurrentSelectionGroup,
	getCurrentWordRangeGroup,
	(selectionGroup, wordRangeGroup) =>
		wordRangeGroup.flatMap((rangeArr, lineIndex) =>
			rangeArr.filter((_, index) => selectionGroup[lineIndex][index] === 1)
		)
);

export const getManuallySelectedString = createSelector(getAll, (state: SelectionData) => state.manuallySelectedString);

const rangeArrToStr = (rangeArr: Range[]) => rangeArr.map((range) => range.toString()).join(" ");
export const getCurrentRangeArrStr = createSelector(getCurrentSelectedWordRanges, rangeArrToStr);

export const manualSelectionOccured = createSelector(getManuallySelectedString, (str) => str !== "");

export const getCurrentSelectedString = createSelector(
	(state: any) => state,
	manualSelectionOccured,
	analyze.selectors.getDataExists,
	(state, manualSelection, dataExists) => {
		if (manualSelection) return getManuallySelectedString(state);

		if (dataExists) return getCurrentRangeArrStr(state);

		return "";
	}
);

export const getSelectionType = createSelector(getAll, (state: SelectionData) => state.selectionType);

export const selectionTypeIsSection = createSelector(getSelectionType, (type) => type === "SECTION");

export const getOverlayRelevantData = createSelector(
	getCurrentSpanGroup,
	getCurrentSelectionGroup,
	getCurrentWordRangeGroup,
	getSectionMovementState,
	display.selectors.getDocumentRef,
	(spanGroup, selectionGroup, wordRangeGroup, movementState, documentRef) => {
		return { spanGroup, selectionGroup, wordRangeGroup, movementState, documentRef };
	}
);
