import * as t from "./actionTypes";
import type { DisplayData } from "./model";

const initialState: DisplayData = { displayStatus: "NONE", currentPage: 1 };

const displayData = (state = initialState, { type, payload }: { type: string; payload: any }): DisplayData => {
	switch (type) {
		case t.PDF_UPLOADED:
			return { ...state, pdf: payload as File };
		case t.MATERIAL_LOADED:
			return { ...state, totalPages: payload as number };
		case t.PAGE_UPDATE:
			return { ...state, currentPage: payload as number };
		default:
			return state;
	}
};

export default displayData;
