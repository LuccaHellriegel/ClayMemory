import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CreationData } from "./model";
import river from "../river";
import selection from "../selection";

export const getAll = (state: any) => state[NAME].present;

export const getContextMenuState = createSelector(getAll, (state: CreationData) => state.open);

export const getContextMenuRef = createSelector(getAll, (state: CreationData) => state.menuRef);

export const getContextMenuFullCardsRef = createSelector(getAll, (state: CreationData) => state.fullCardRef);

export const getContextMenuQARefs = createSelector(getAll, (state: CreationData) => state.qaRefs);

export const getContextMenuInitData = createSelector(
	selection.selectors.getCurrentSelectionPosition,
	getContextMenuState,
	getContextMenuRef,
	getContextMenuQARefs,
	river.selectors.getPushToRiverCards,
	(position, state, menuRef, qaRefs, riverCards) => {
		return { position, state, menuRef, qaRefs, riverCards };
	}
);
