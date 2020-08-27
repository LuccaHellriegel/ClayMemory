import { createSelector } from "reselect";
import { DisplayData, MaterialData, MaterialGroupData } from "./model";
import { NAME } from "./constants";

export const getAll = (state: any): DisplayData => state[NAME];

export const getPDF = createSelector(getAll, (state: DisplayData) => {
	return { pdf: state.pdf ? state.pdf : null };
});

export const getPDFName = createSelector(getAll, (state) => state.pdfName);

export const getRenderCritialData = createSelector(getAll, (state: DisplayData) => {
	return {
		pdf: state.pdf,
		currentPage: state.currentPage,
		documentRef: state.documentRef,
	};
});

export const getTotalPages = createSelector(getAll, (state: DisplayData) => state.totalPages);

export const getCurrentPage = createSelector(getAll, (state: DisplayData) => state.currentPage);

export const getPageControlData = createSelector(getTotalPages, getCurrentPage, (totalPages, currentPage) => {
	return { currentPage, totalPages };
});

export const getDocumentRef = createSelector(getAll, (state: DisplayData) => state.documentRef);

export const getMaterialData = createSelector(getAll, (state: DisplayData) => state.materialData);

export const getTimeStamp = createSelector(getMaterialData, (state: MaterialData) => state.materialDataTimeStamp);

export const getMaterialSpans = createSelector(
	getMaterialData as (state: any) => MaterialGroupData,
	(state: MaterialGroupData) => state.materialSpans
);

export const getSpanIndex = (state: any, span: HTMLSpanElement) => {
	const spans = getMaterialSpans(state);
	return spans.indexOf(span);
};

export const getMaterialBoundingRects = createSelector(
	getMaterialData as (state: any) => MaterialGroupData,
	(state: MaterialGroupData) => state.materialBoundingRects
);

export const getDataExists = createSelector(getTimeStamp, (timestamp) => timestamp > 0);

export const getDisplayStatus = createSelector(getAll, (state: DisplayData) => state.displayStatus);

export const displayStatusIsShow = createSelector(getDisplayStatus, (status) => status === "SHOW");

export const getZoomQueue = createSelector(getAll, (state: DisplayData) => state.zoomQueue);

export const getMaterialHeight = createSelector(getAll, (state: DisplayData) => state.materialHeight);
