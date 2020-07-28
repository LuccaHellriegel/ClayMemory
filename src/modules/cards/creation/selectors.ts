import { NAME } from "./constants";
import { createSelector } from "reselect";
import material from "../../material";

export const getAll = (state: any) => state[NAME];

export const getContextMenuState = createSelector(getAll, (state: boolean) => state);

export const getContextMenuFillData = createSelector(
	material.select.selectors.getCurrentBoundingRectGroup,
	getContextMenuState,
	(boundingRectGroup, state) => {
		return { boundingRectGroup, state };
	}
);
