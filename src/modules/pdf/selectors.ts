import { createSelector } from "reselect";
import { PDFState } from "./model";
import { NAME } from "./constants";

export const getAll = (state: any): PDFState => state[NAME];

export const getPDF = createSelector(getAll, (state: PDFState) => state.pdf);

export const getPDFName = createSelector(getAll, (state) => state.pdfName);

export const getTotalPages = createSelector(getAll, (state: PDFState) => state.totalPages);

export const getCurrentPage = createSelector(getAll, (state: PDFState) => state.currentPage);

export const getPageControlData = createSelector(getTotalPages, getCurrentPage, (totalPages, currentPage) => {
	return { currentPage, totalPages };
});

export const getPDFShowStatus = createSelector(getAll, (state: PDFState) => state.pdfShowStatus);

export const getSpanOrigin = createSelector(getAll, (state) => state.spanOrigin);

export const getDocumentSearch = createSelector(getAll, (state) => state.documentSearch);
