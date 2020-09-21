import { createSelector } from "reselect";
import { DisplayData } from "./model";
import { NAME } from "./constants";

export const getAll = (state: any): DisplayData => state[NAME];

export const getPDF = createSelector(getAll, (state: DisplayData) => state.pdf);

export const getWindowMeasurements = createSelector(getAll, (state) => state.windowMeasurements);

export const getPDFName = createSelector(getAll, (state) => state.pdfName);

export const getTotalPages = createSelector(getAll, (state: DisplayData) => state.totalPages);

export const getCurrentPage = createSelector(getAll, (state: DisplayData) => state.currentPage);

export const getScrollToPage = createSelector(getAll, (state) => state.scrollToPage);

export const getPageControlData = createSelector(getTotalPages, getCurrentPage, (totalPages, currentPage) => {
	return { currentPage, totalPages };
});

export const getDisplayStatus = createSelector(getAll, (state: DisplayData) => state.displayStatus);

export const displayStatusIsShow = createSelector(getDisplayStatus, (status) => status === "SHOW");

export const getSpanOrigin = createSelector(getAll, (state) => state.spanOrigin);

export const getDocumentSearch = createSelector(getAll, (state) => state.documentSearch);

export const getTopOffset = createSelector(getAll, (state) => state.topOffset);
