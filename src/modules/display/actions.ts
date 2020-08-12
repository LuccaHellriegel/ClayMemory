import { ChangeEvent, RefObject } from "react";
import { Dispatch } from "redux";
import * as t from "./actionTypes";
import { DisplayStatus, PageMove, MaterialData } from "./model";
import { getPageControlData, getDisplayStatus, getZoomQueue, getTimeStamp, getMaterialSpans } from "./selectors";
import { incrementer } from "../../shared/utils";
import { materialData } from "./services/materialData";

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
	return { type: t.DISPLAY_STATUS, payload: "SHOW" };
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
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const container = documentRef.current;
		if (container) {
			// TODO: still possibility of race-condition,
			// maybe check on each section update if the number is congruent and if not actualize?
			// TODO: make fluid movement for changing from non-existing section on new page to existing one

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
		dispatch(setPage(page));
		dispatch(setZoomQueue(spanIndex));
	};
};

export const emptyZoomQueue = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const spanIndex = getZoomQueue(state);
		const originSpan = getMaterialSpans(state)[spanIndex as number];
		originSpan.focus();
		originSpan.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

		dispatch(setZoomQueue(null));
	};
};
