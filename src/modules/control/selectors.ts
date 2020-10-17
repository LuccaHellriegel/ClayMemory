import { createSelector } from "reselect";
import display from "../display";
import river from "../river";
import cards from "../cards";
import { DocumentData } from "../db/model";

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
