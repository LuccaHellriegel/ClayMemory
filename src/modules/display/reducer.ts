import * as t from "./actionTypes";
import { DisplayData, DisplayStatus, View } from "./model";
import { ClayMemoryPayloadAction } from "../../shared/utils";
import { ExistingDocumentPayload } from "./actions";

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
		case t.LOAD_EXISTING_DOCUMENT:
			return {
				...initialState,
				pdf: undefined,
				...(payload as ExistingDocumentPayload),
			};
		default:
			return state;
	}
};

export default displayData;
