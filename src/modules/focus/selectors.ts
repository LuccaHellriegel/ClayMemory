import { createSelector } from "reselect";
import { NAME } from "./constants";
import { FocusState } from "./model";

export const getAll = (state: any) => state[NAME];

export const getFocus = createSelector(getAll, (state: FocusState) => state.userFocus);

export const getDisplayFocus = createSelector(getAll, (state: FocusState) => state.displayFocus);
