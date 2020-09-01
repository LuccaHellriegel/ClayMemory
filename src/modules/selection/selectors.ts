import { NAME } from "./constants";
import { createSelector } from "reselect";
import { SelectionData } from "./model";
import display from "../display";
import { SingleOrigin } from "../cards/model/model-origin";

export const getAll = (state: any): SelectionData => state[NAME].present;

export const getCurrentSelectionPosition = createSelector(getAll, (state: SelectionData) => state.selectionPosition);

export const getCurrentSelectedString = createSelector(getAll, (state: SelectionData) => state.manuallySelectedString);

export const getCurrentSelectedParent = createSelector(getAll, (state: SelectionData) => state.selectedParentSpan);

export const getCurrentOrigin = createSelector(
	(state: any) => state,
	display.selectors.getCurrentPage,
	getCurrentSelectedParent,
	(state, currentPage, selectedParent): SingleOrigin => {
		return {
			spanIndex: display.selectors.getSpanIndex(state, selectedParent as HTMLSpanElement),
			page: currentPage,
		};
	}
);
