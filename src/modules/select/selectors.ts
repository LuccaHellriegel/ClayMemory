import { NAME } from "./constants";
import { SelectionData } from "./model";
import { createSelector } from "reselect";
import analyze from "../analyze";

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

export const getCurrentSelectedString = createSelector(getCurrentSelectedWordRanges, (rangeArr) =>
	rangeArr.map((range) => range.toString()).join(" ")
);

export const getOverlayRelevantData = createSelector(
	getCurrentSpanGroup,
	getCurrentSelectionGroup,
	getCurrentWordRangeGroup,
	getSectionMovementState,
	(spanGroup, selectionGroup, wordRangeGroup, movementState) => {
		return { spanGroup, selectionGroup, wordRangeGroup, movementState };
	}
);