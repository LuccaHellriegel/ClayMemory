import * as t from "./actionTypes";
import { DisplayData, DisplayStatus, View } from "./model";
import db from "../db";
import { ClayMemoryPayloadAction } from "../../shared/utils";

const initialState: DisplayData = {
	displayStatus: "SHOW",
	totalPages: 1000,
	currentPage: 1,
	scrollToPage: null,
	windowMeasurements: null,
	spanOrigin: null,
	documentSearch: "",
	topOffset: 0,
	currentView: View.RiverMaterial,
};

const displayData = (state = initialState, { type, payload }: ClayMemoryPayloadAction): DisplayData => {
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
		case t.TOP_OFFSET:
			return { ...state, topOffset: payload };
		case t.WINDOW_LAYOUT:
			return {
				...state,
				windowMeasurements: payload,
			};
		case t.VIEW_CHANGE:
			return { ...state, currentView: payload };
		default:
			return state;
	}
};

export default displayData;
