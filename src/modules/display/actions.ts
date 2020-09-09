import { Dispatch } from "redux";
import * as t from "./actionTypes";
import { PageMove, pageCorrections } from "./model";
import { getPageControlData, getDisplayStatus, getZoomTarget } from "./selectors";
import { keyEventDispatcherCreator, KeyActionMap } from "../../shared/utils";

export const pdfUpload = (pdf: File) => {
	return { type: t.PDF_UPLOADED, payload: pdf };
};

export const materialLoaded = (totalPages: number) => {
	return { type: t.MATERIAL_LOADED, payload: totalPages };
};

export const setPage = (page: number) => {
	return { type: t.PAGE_UPDATE, payload: page };
};

//TODO-PERF: maybe hide all rendered pages but not shown instead of re-rendering for faster switching?
export const movePage = (type: PageMove) => {
	return (dispatch: Dispatch, getState: Function) => {
		const { currentPage, totalPages } = getPageControlData(getState());
		switch (type) {
			case "NEXT":
				dispatch(setPage(pageCorrections["ADD"](currentPage + 1, totalPages)));
				break;
			case "PREVIOUS":
				dispatch(setPage(pageCorrections["REMOVE"](currentPage - 1, totalPages)));
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

export const setZoomTarget = (spanIndex: number | null) => {
	return { type: t.ZOOM_QUEUE, payload: spanIndex };
};

export const zoomToCardOrigin = (spanIndex: number, page: number) => {
	return (dispatch: Dispatch) => {
		console.log(page, spanIndex);
		dispatch(setPage(page));
		dispatch(setZoomTarget(spanIndex));
	};
};

export const scrollToZoomTarget = () => {
	return (dispatch: Dispatch, getState: Function) => {
		// 	const state = getState();
		// 	const spanIndex = getZoomTarget(state);
		// 	if (!!spanIndex) {
		// 		const materialSpans = getMaterialSpans(state);
		// 		if (materialSpans) {
		// 			// this way when no pdf was present we prevent the race-condition of pdf being loaded later
		// 			const originSpan = materialSpans[spanIndex];
		// 			originSpan.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
		// 		}
		// 		dispatch(setZoomTarget(null));
		// 	}
	};
};
