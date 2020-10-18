import { createSelector } from "reselect";
import river from "../river";
import cards from "../cards";
import { DocumentData } from "../db/model";
import pdf from "../pdf";

export const collectCurrentDBData: (state: any) => DocumentData | null = createSelector(
	pdf.selectors.getPDFName,
	pdf.selectors.getTotalPages,
	pdf.selectors.getCurrentPage,
	river.selectors.getRiverMakeUps,
	river.selectors.getActiveRiverMakeUpID,
	cards.selectors.getCards,
	cards.selectors.getLastCardIDNumber,
	(pdfName, totalPages, currentPage, riverMakeUps, riverActiveID, cards, lastCardIDNumber) => {
		return {
			name: pdfName as string,
			totalPages,
			currentPage,
			riverMakeUps,
			riverActiveID,
			cards,
			lastCardIDNumber,
		};
	}
);
