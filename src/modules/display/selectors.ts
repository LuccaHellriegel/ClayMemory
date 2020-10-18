import { createSelector } from "reselect";
import { DisplayData } from "./model";
import { NAME } from "./constants";

export const getAll = (state: any): DisplayData => state[NAME];

export const getWindowMeasurements = createSelector(getAll, (state) => state.windowMeasurements);

export const getTopOffset = createSelector(getAll, (state) => state.topOffset);

export const getCurrentView = createSelector(getAll, (state) => state.currentView);
