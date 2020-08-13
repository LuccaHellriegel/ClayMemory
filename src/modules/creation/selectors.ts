import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CreationData } from "./model";
import river from "../river";
import display from "../display";
import { SingleOrigin } from "../cards/model";

export const getAll = (state: any) => state[NAME];

export const getContextMenuState = createSelector(getAll, (state: CreationData) => state.open);

export const getContextMenuRef = createSelector(getAll, (state: CreationData) => state.menuRef);

export const getContextMenuQARefs = createSelector(getAll, (state: CreationData) => state.qaRefs);

export const getCurrentSelectionPosition = createSelector(getAll, (state: CreationData) => state.selectionPosition);

export const getContextMenuInitData = createSelector(
	getCurrentSelectionPosition,
	getContextMenuState,
	getContextMenuRef,
	getContextMenuQARefs,
	river.selectors.getPushToRiverCards,
	(position, state, menuRef, qaRefs, riverCards) => {
		return { position, state, menuRef, qaRefs, riverCards };
	}
);

export const getCurrentSelectedString = createSelector(getAll, (state: CreationData) => state.manuallySelectedString);

export const getCurrentSelectedParent = createSelector(getAll, (state: CreationData) => state.selectedParentSpan);

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
