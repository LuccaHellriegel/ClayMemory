import { Dispatch } from "redux";
import * as t from "./actionTypes";
import { PageMove, pageCorrections } from "./model";
import { getPageControlData, getDisplayStatus } from "./selectors";
import { keyEventDispatcherCreator, KeyActionMap } from "../../shared/utils";
import { SingleOrigin } from "../cards/model/model-origin";

export const widthPixels = (windowMeasurements: { width: number; height: number }) => {
	return { type: t.WINDOW_LAYOUT, payload: windowMeasurements };
};

export const pdfUpload = (pdf: File) => {
	return { type: t.PDF_UPLOADED, payload: pdf };
};

export const materialLoaded = (totalPages: number) => {
	return { type: t.MATERIAL_LOADED, payload: totalPages };
};

export const setPage = (page: number, shouldScroll: boolean) => {
	return { type: t.PAGE_UPDATE, payload: { page, shouldScroll } };
};

export const movePage = (type: PageMove) => {
	return (dispatch: Dispatch, getState: Function) => {
		const { currentPage, totalPages } = getPageControlData(getState());
		switch (type) {
			case "NEXT":
				dispatch(setPage(pageCorrections["ADD"](currentPage + 1, totalPages), true));
				break;
			case "PREVIOUS":
				dispatch(setPage(pageCorrections["REMOVE"](currentPage - 1, totalPages), true));
				break;
		}
	};
};
export const nextPage = () => movePage("NEXT");
export const previousPage = () => movePage("PREVIOUS");
const pageControlKeyMap: KeyActionMap = {
	ArrowLeft: previousPage(),
	ArrowRight: nextPage(),
};
export const pageControlDispatcher = keyEventDispatcherCreator(pageControlKeyMap);

export const toggleDisplayState = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const displayState = getDisplayStatus(getState()) === "SHOW" ? "HIDE" : "SHOW";

		dispatch({ type: t.DISPLAY_STATUS, payload: displayState });
	};
};

export const setSpanOrigin = (origin: SingleOrigin | null) => {
	return { type: t.SPAN_ORIGIN, payload: origin };
};

export const resetSpanOrigin = () => {
	return setSpanOrigin(null);
};
