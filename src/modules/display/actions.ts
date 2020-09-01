import { ChangeEvent, RefObject } from "react";
import { Dispatch } from "redux";
import * as t from "./actionTypes";
import { PageMove, MaterialData } from "./model";
import {
	getPageControlData,
	getDisplayStatus,
	getZoomQueue,
	getTimeStamp,
	getMaterialSpans,
	getPDFName,
} from "./selectors";
import { incrementer } from "../../shared/utils";
import { materialData } from "./services/materialData";
import db from "../db";
import { ActionCreators } from "redux-undo";

export const pdfUpload = (pdf: File) => {
	return { type: t.PDF_UPLOADED, payload: pdf };
};

export const materialUploaded = (event: ChangeEvent<HTMLInputElement>) => {
	return (dispatch: Dispatch) => {
		const files = event.target.files;
		const pdf = files ? files[0] : null;
		if (pdf) dispatch(pdfUpload(pdf));
	};
};

export const materialLoaded = (totalPages: number) => {
	return { type: t.MATERIAL_LOADED, payload: totalPages };
};

export const tryInterval = (tries: number, ms: number, func: () => boolean) => {
	const increment = incrementer();
	const timeout = setInterval(() => {
		if (increment() > tries) {
			clearInterval(timeout);
			return;
		}

		if (func()) clearInterval(timeout);
	}, ms);
};

// text-layer is not really guaranteed to be rendered on render "success",
// so we use this ugly "try ten times" approach
export function captureMaterialData(documentRef: RefObject<any>) {
	return (dispatch: any, getState: Function) => {
		const state = getState();
		const container = documentRef.current;
		if (container) {
			// TODO-NICE: still possibility of race-condition,

			const startTime = Date.now();

			// try once before going into intervals (most times once should work)
			const curMaterialGroupData = materialData(container as HTMLDivElement);
			if (curMaterialGroupData && getTimeStamp(state) < startTime) {
				const payload: MaterialData = {
					...curMaterialGroupData,
					materialDataTimeStamp: startTime,
				};
				dispatch({ type: t.MATERIAL_DATA, payload });
			} else {
				tryInterval(10, 20, () => {
					const curMaterialGroupData = materialData(container as HTMLDivElement);
					if (curMaterialGroupData && getTimeStamp(getState()) < startTime) {
						const payload: MaterialData = {
							...curMaterialGroupData,
							materialDataTimeStamp: startTime,
						};
						dispatch({ type: t.MATERIAL_DATA, payload });
						return true;
					}
					return false;
				});
			}
		}
	};
}

// assumes outside validation/correction
export const setPage = (page: number) => {
	return { type: t.PAGE_UPDATE, payload: page };
};

const pageCorrections = {
	ADD: (newPage: number, totalPages: number) => (newPage === totalPages + 1 ? 1 : newPage),
	REMOVE: (newPage: number, totalPages: number) => (newPage === 0 ? totalPages : newPage),
};

//TODO-PERF: maybe hide all rendered pages but not shown instead of re-rendering for faster switching?
export const movePage = (type: PageMove) => {
	return (dispatch: Dispatch, getState: Function) => {
		const { currentPage, totalPages } = getPageControlData(getState());
		switch (type) {
			case "NEXT":
				dispatch({ type: t.PAGE_UPDATE, payload: pageCorrections["ADD"](currentPage + 1, totalPages) });
				break;
			case "PREVIOUS":
				dispatch({ type: t.PAGE_UPDATE, payload: pageCorrections["REMOVE"](currentPage - 1, totalPages) });
				break;
		}
	};
};
export const nextPage = () => movePage("NEXT");
export const previousPage = () => movePage("PREVIOUS");

export const toggleDisplayState = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const displayState = getDisplayStatus(getState()) === "SHOW" ? "HIDE" : "SHOW";

		dispatch({ type: t.DISPLAY_STATUS, payload: displayState });
	};
};

export const setZoomQueue = (spanIndex: number | null) => {
	return { type: t.ZOOM_QUEUE, payload: spanIndex };
};

export const zoomToCardOrigin = (spanIndex: number, page: number) => {
	return (dispatch: Dispatch) => {
		console.log(page, spanIndex);
		dispatch(setPage(page));
		dispatch(setZoomQueue(spanIndex));
	};
};

export const emptyZoomQueue = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const spanIndex = getZoomQueue(state);
		if (!!spanIndex) {
			const materialSpans = getMaterialSpans(state);
			if (materialSpans) {
				// this way when no pdf was present we prevent the race-condition of pdf being loaded later
				const originSpan = materialSpans[spanIndex];
				originSpan.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
			}
			dispatch(setZoomQueue(null));
		}
	};
};

export const setMaterialHeight = (height: number) => {
	return { type: t.MATERIAL_HEIGHT, payload: height };
};

export const deleteDocument = (document: string) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const activeDocument = getPDFName(state);
		if (activeDocument && activeDocument === document) {
			// reset data
			dispatch({ type: db.actionTypes.DOCUMENT_CHANGE });

			// keeping the undo history leads to weird edge cases and makes no sense
			dispatch(ActionCreators.clearHistory());
		}

		// note: no undo of this
		dispatch(db.actions.deleteDocumentDataSet(document));
	};
};
