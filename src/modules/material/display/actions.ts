import { ChangeEvent } from "react";
import { Dispatch } from "redux";
import * as t from "./actionTypes";
import { DisplayStatus, PageUpdate } from "./model";
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

export const updatePage = (type: PageUpdate) => {
	return (dispatch: Dispatch, getState: Function) => {
		const { currentPage, totalPages } = getPageControlData(getState());
		if (totalPages) {
			let newPage;
			switch (type) {
				case "NEXT":
					newPage = currentPage + 1;
					if (newPage === totalPages + 1) newPage = 1;
					dispatch({ type: t.PAGE_UPDATE, payload: newPage });
					break;
				case "PREVIOUS":
					newPage = currentPage - 1;
					if (newPage === 0) newPage = totalPages;
					dispatch({ type: t.PAGE_UPDATE, payload: newPage });
					break;
			}
		}
	};
};
export const nextPage = () => updatePage("NEXT");
export const previousPage = () => updatePage("PREVIOUS");
