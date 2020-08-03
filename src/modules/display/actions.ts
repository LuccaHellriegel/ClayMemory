import { ChangeEvent } from "react";
import { Dispatch } from "redux";
import * as t from "./actionTypes";
import { DisplayStatus, PageMove } from "./model";
import { getPageControlData } from "./selectors";

export const materialUploaded = (event: ChangeEvent<HTMLInputElement>) => {
	return (dispatch: Dispatch) => {
		const files = event.target.files;
		const pdf = files ? files[0] : null;
		if (pdf) dispatch({ type: t.PDF_UPLOADED, payload: pdf });
	};
};

export const materialLoaded = (totalPages: number) => {
	return { type: t.MATERIAL_LOADED, payload: totalPages };
};

export const materialRendered = (): { type: string; payload: DisplayStatus } => {
	return { type: t.DISPLAY_STATUS, payload: "RENDERED" };
};

// assumes outside validation/correction
export const setPage = (page: number) => {
	return { type: t.PAGE_UPDATE, payload: page };
};

const pageCorrections = {
	ADD: (newPage: number, totalPages: number) => (newPage === totalPages + 1 ? 1 : newPage),
	REMOVE: (newPage: number, totalPages: number) => (newPage === 0 ? totalPages : newPage),
};

export const movePage = (type: PageMove) => {
	return (dispatch: Dispatch, getState: Function) => {
		const { currentPage, totalPages } = getPageControlData(getState());
		if (totalPages) {
			switch (type) {
				case "NEXT":
					dispatch({ type: t.PAGE_UPDATE, payload: pageCorrections["ADD"](currentPage + 1, totalPages) });
					break;
				case "PREVIOUS":
					dispatch({ type: t.PAGE_UPDATE, payload: pageCorrections["REMOVE"](currentPage - 1, totalPages) });
					break;
			}
		}
	};
};
export const nextPage = () => movePage("NEXT");
export const previousPage = () => movePage("PREVIOUS");
