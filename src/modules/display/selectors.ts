import { createSelector } from "reselect";
import { DisplayState } from "./model";
import { NAME } from "./constants";

export const getAll = (state: any): DisplayState => state[NAME];

export const getWindowMeasurements = createSelector(getAll, (state) => state.windowMeasurements);

export const getTopOffset = createSelector(getAll, (state) => state.topOffset);

export const getListIndex = createSelector(getAll, (state) => state.listIndex);

export const getScrollToPage = createSelector(getAll, (state) => state.scrollToPage);

export const getScrollToOriginSpan = createSelector(getAll, (state) => state.scrollToOriginSpan);

export const getCurrentView = createSelector(getAll, (state) => state.currentView);
