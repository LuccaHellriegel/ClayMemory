import * as t from "./actionTypes";
import type { DisplayData, DisplayStatus, MaterialGroupData } from "./model";
import { createRef } from "react";

const initialState: DisplayData = {
	displayStatus: "SHOW",
	totalPages: 1000,
	currentPage: 1,
	documentRef: createRef(),
	pageSpans: {},
	zoomQueue: null,
	materialData: { materialDataTimeStamp: -Infinity },
};

const displayData = (state = initialState, { type, payload }: { type: string; payload: any }): DisplayData => {
	switch (type) {
		case t.PDF_UPLOADED:
			return { ...state, pdf: payload as File, pdfName: (payload as File).name };
		case t.MATERIAL_LOADED:
			return { ...state, totalPages: payload as number };
		case t.PAGE_UPDATE:
			return { ...state, currentPage: payload as number };
		case t.DISPLAY_STATUS:
			return { ...state, displayStatus: payload as DisplayStatus };
		case t.MATERIAL_DATA:
			return {
				...state,
				materialData: payload,
				pageSpans: { ...state.pageSpans, [state.currentPage]: (payload as MaterialGroupData).materialSpans.length - 1 },
			};
		default:
			return state;
	}
};

export default displayData;
