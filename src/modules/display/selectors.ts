import { createSelector } from "reselect";
import { DisplayData } from "./model";
import { NAME } from "./constants";
// import selection from "../selection";
// import { SingleOrigin } from "../cards/model/model-origin";

export const getAll = (state: any): DisplayData => state[NAME];

export const getPDF = createSelector(getAll, (state: DisplayData) => state.pdf);

export const getPDFName = createSelector(getAll, (state) => state.pdfName);

export const getTotalPages = createSelector(getAll, (state: DisplayData) => state.totalPages);

export const getCurrentPage = createSelector(getAll, (state: DisplayData) => state.currentPage);

export const getPageControlData = createSelector(getTotalPages, getCurrentPage, (totalPages, currentPage) => {
	return { currentPage, totalPages };
});

export const getDocumentRef = createSelector(getAll, (state: DisplayData) => state.documentRef);

export const getDisplayStatus = createSelector(getAll, (state: DisplayData) => state.displayStatus);

export const displayStatusIsShow = createSelector(getDisplayStatus, (status) => status === "SHOW");

export const getZoomTarget = createSelector(getAll, (state: DisplayData) => state.zoomTargetSpanIndex);
