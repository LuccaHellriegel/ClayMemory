import { createSelector } from "reselect";
import { NAME } from "./constants";
import { ControlData } from "./model";

export const getAll = (state: any) => state[NAME];

export const getFocus = createSelector(getAll, (state: ControlData) => state.focus);
