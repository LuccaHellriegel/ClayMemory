import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CreationData } from "./model";
import select from "../../material/select";

export const getAll = (state: any) => state[NAME];

export const getContextMenuState = createSelector(getAll, (state: CreationData) => state.open);

export const getContextMenuRef = createSelector(getAll, (state: CreationData) => state.menuRef);

export const getContextMenuInitData = createSelector(
	select.selectors.getCurrentBoundingRectGroup,
	getContextMenuState,
	getContextMenuRef,
	(boundingRectGroup, state, menuRef) => {
		return { boundingRectGroup, state, menuRef };
	}
);
