import { NAME } from "./constants";
import { createSelector } from "reselect";
import { SelectionData } from "./model";

export const getAll = (state: any): SelectionData => state[NAME].present;

export const getCurrentSelectionPosition = createSelector(getAll, (state: SelectionData) => state.selectionPosition);

export const getCurrentSelectedString = createSelector(getAll, (state: SelectionData) => state.manuallySelectedString);

export const getCurrentSelectedParent = createSelector(getAll, (state: SelectionData) => state.selectedParentSpan);

export const getSourceCard = createSelector(getAll, (state) => state.sourceCard);
