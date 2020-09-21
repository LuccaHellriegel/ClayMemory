import * as t from "./actionTypes";
import type { DisplayData, DisplayStatus } from "./model";
import db from "../db";

const initialState: DisplayData = {
	displayStatus: "SHOW",
	totalPages: 1000,
	currentPage: 1,
	scrollToPage: null,
	windowMeasurements: null,
	spanOrigin: null,
	documentSearch: "",
};

const displayData = (state = initialState, { type, payload }: { type: string; payload: any }): DisplayData => {
	switch (type) {
		case t.PDF_UPLOADED:
			return { ...state, pdf: payload as File, pdfName: (payload as File).name };
		case db.actionTypes.DOCUMENT_CHANGE:
			if (payload) {
				// this means the pdf has been already uploaded (Load Document) and this was not triggered not via options
				if (payload.name === state.pdfName) {
					return state;
				}
				return {
					...initialState,
					pdf: undefined,
					pdfName: payload.name,
					totalPages: payload.totalPages,
					currentPage: payload.currentPage,
				};
			} else {
				// dont need to reset here because when loading pdf we set automatically via other actions
				return state;
			}
		case t.MATERIAL_LOADED:
			return { ...state, totalPages: payload as number };
		case t.PAGE_UPDATE:
			return { ...state, currentPage: payload.page, scrollToPage: payload.shouldScroll ? payload.page : null };
		case t.DISPLAY_STATUS:
			return { ...state, displayStatus: payload as DisplayStatus };
		case t.SPAN_ORIGIN:
			return { ...state, spanOrigin: payload };
		case t.DOCUMENT_SEARCH:
			return { ...state, documentSearch: payload };
		case t.WINDOW_LAYOUT:
			return {
				...state,
				windowMeasurements: payload,
			};
		default:
			return state;
	}
};

export default displayData;
