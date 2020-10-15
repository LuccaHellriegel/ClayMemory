import { createSelector } from "reselect";
import display from "../display";
import river from "../river";
import cards from "../cards";
import { DocumentData } from "../db/model";
import { NAME } from "./constants";
import { Model } from "./model";

export const collectCurrentDBData: (state: any) => DocumentData | null = createSelector(
	display.selectors.getPDFName,
	display.selectors.getTotalPages,
	display.selectors.getCurrentPage,
	river.selectors.getRiverMakeUps,
	river.selectors.getActiveRiverMakeUpID,
	cards.selectors.getCards,
	cards.selectors.getLastCardIDNumber,
	(pdfName, totalPages, currentPage, riverMakeUps, activeRiverMakeUpID, cards, lastCardIDNumber) => {
		return {
			name: pdfName as string,
			totalPages,
			currentPage,
			riverMakeUps,
			activeRiverMakeUpID,
			cards,
			lastCardIDNumber,
		};
	}
);

export const getAll = (state: any): Model => state[NAME];

export const getLastUndoableAction = createSelector(getAll, (state) => state.present);

export const getLastRedoableAction = createSelector(getAll, (state) =>
	state.future.length > 0 ? state.future[0] : null
);
