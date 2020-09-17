import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CreationData } from "./model";

export const getAll = (state: any): CreationData => state[NAME].present;

export const getContextMenuRef = createSelector(getAll, (state: CreationData) => state.menuRef);

export const getContextMenuPosition = createSelector(getAll, (state) => state.position);
