import { NAME } from "./constants";
import { createSelector } from "reselect";
import material from "../../material";
import { CreationData } from "./model";

export const getAll = (state: any) => state[NAME];

export const getContextMenuState = createSelector(getAll, (state: CreationData) => state.open);

export const getContextMenuRef = createSelector(getAll, (state: CreationData) => state.menuRef);

export const getContextMenuInitData = createSelector(
	material.select.selectors.getCurrentBoundingRectGroup,
	getContextMenuState,
	getContextMenuRef,
	(boundingRectGroup, state, menuRef) => {
		return { boundingRectGroup, state, menuRef };
	}
);
