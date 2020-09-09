import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CreationData } from "./model";
import river from "../river";

export const getAll = (state: any): CreationData => state[NAME].present;

export const getContextMenuRef = createSelector(getAll, (state: CreationData) => state.menuRef);

export const getContextMenuFullCardsRef = createSelector(getAll, (state: CreationData) => state.fullCardRef);

export const getContextMenuQARefs = createSelector(getAll, (state: CreationData) => state.qaRefs);

export const getContextMenuPosition = createSelector(getAll, (state) => state.position);

export const getContextMenuInitData = createSelector(
	getContextMenuPosition,
	getContextMenuRef,
	getContextMenuQARefs,
	river.selectors.getActiveRiverCards,
	(position, menuRef, qaRefs, riverCards) => {
		return { position, menuRef, qaRefs, riverCards };
	}
);
