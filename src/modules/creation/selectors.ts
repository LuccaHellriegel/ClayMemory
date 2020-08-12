import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CreationData } from "./model";
import river from "../river";

export const getAll = (state: any) => state[NAME];

export const getContextMenuState = createSelector(getAll, (state: CreationData) => state.open);

export const getContextMenuRef = createSelector(getAll, (state: CreationData) => state.menuRef);

export const getContextMenuQARefs = createSelector(getAll, (state: CreationData) => state.qaRefs);

//TODO: position in store
export const getCurrentSelectionPosition = (state: any) => {
	return { x: 0, y: 0 };
};

export const getContextMenuInitData = createSelector(
	getCurrentSelectionPosition,
	getContextMenuState,
	getContextMenuRef,
	getContextMenuQARefs,
	river.selectors.getActiveRiverCards,
	(position, state, menuRef, qaRefs, riverCards) => {
		return { position, state, menuRef, qaRefs, riverCards };
	}
);

export const getCurrentSelectedString = createSelector(getAll, (state: CreationData) => state.manuallySelectedString);

export const getCurrentSelectedParent = createSelector(getAll, (state: CreationData) => state.selectedParentSpan);
