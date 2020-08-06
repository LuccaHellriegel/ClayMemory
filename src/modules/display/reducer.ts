import * as t from "./actionTypes";
import type { DisplayData, DisplayStatus } from "./model";
import { createRef } from "react";

const initialState: DisplayData = { displayStatus: "SHOW", currentPage: 1, documentRef: createRef() };

const displayData = (state = initialState, { type, payload }: { type: string; payload: any }): DisplayData => {
	switch (type) {
		case t.PDF_UPLOADED:
			return { ...state, pdf: payload as File };
		case t.MATERIAL_LOADED:
			return { ...state, totalPages: payload as number };
		case t.PAGE_UPDATE:
			return { ...state, currentPage: payload as number };
		case t.DISPLAY_STATUS:
			return { ...state, displayStatus: payload as DisplayStatus };
		default:
			return state;
	}
};

export default displayData;
