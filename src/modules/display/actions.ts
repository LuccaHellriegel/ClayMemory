import { ChangeEvent, RefObject } from "react";
import { Dispatch } from "redux";
import * as t from "./actionTypes";
import { PageMove, MaterialData, pageCorrections } from "./model";
import {
	getPageControlData,
	getDisplayStatus,
	getZoomTarget,
	getTimeStamp,
	getMaterialSpans,
	getCurrentOrigin,
} from "./selectors";
import { keyEventDispatcherCreator, KeyActionMap, tryInterval } from "../../shared/utils";
import { materialData } from "./services/materialData";
import selection from "../selection";
import cards from "../cards";

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
		const state = getState();
		const spanIndex = getZoomTarget(state);
		if (!!spanIndex) {
			const materialSpans = getMaterialSpans(state);
			if (materialSpans) {
				// this way when no pdf was present we prevent the race-condition of pdf being loaded later
				const originSpan = materialSpans[spanIndex];
				originSpan.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
			}
			dispatch(setZoomTarget(null));
		}
	};
};

export const setMaterialHeight = (height: number) => {
	return { type: t.MATERIAL_HEIGHT, payload: height };
};

export const mouseUpDocument = () => {
	return (dispatch: any, getState: Function) => {
		const selectionData = selection.services.getSelection();

		if (selectionData) {
			const selectedStr = selectionData.text;
			const selectionObject = selectionData.selection;

			const state = getState();

			// check if we activated a Grab-button
			const goalCard = cards.selectors.getGoalCard(state);

			const selectedParent = selectionObject.anchorNode?.parentNode as HTMLSpanElement;
			dispatch(selection.actions.selectedParent(selectedParent));

			if (goalCard) {
				// this is the dispatch for the grab for field button
				//(which has been pressed before the mouse-up if goalCard is not null), here we actually update the goal card

				//TODO-NICE: allow grabbing from other cards
				// for now we dont allow grabbing from other cards to simplifiy the card->card workflow

				dispatch(
					cards.actions.replaceCardField(goalCard.creationType, goalCard, selectedStr, getCurrentOrigin(getState()))
				);
			} else {
				dispatch(selection.actions.updateManuallySelectedString(selectedStr));
			}
		}
	};
};
