import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CreationData } from "./model";
import select from "../select";
import river from "../river";

export const getAll = (state: any) => state[NAME];

export const getContextMenuState = createSelector(getAll, (state: CreationData) => state.open);

export const getContextMenuRef = createSelector(getAll, (state: CreationData) => state.menuRef);

export const getContextMenuQARefs = createSelector(getAll, (state: CreationData) => state.qaRefs);

export const getContextMenuInitData = createSelector(
	select.selectors.getCurrentSelectionPosition,
	getContextMenuState,
	getContextMenuRef,
	getContextMenuQARefs,
	river.selectors.getActiveRiverCards,
	(position, state, menuRef, qaRefs, riverCards) => {
		return { position, state, menuRef, qaRefs, riverCards };
	}
);
