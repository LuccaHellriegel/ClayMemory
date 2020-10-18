import { createSelector } from "reselect";
import { NAME } from "./constants";
import { DocumentDB, DocumentData } from "./model";
import river from "../river";
import cards from "../cards";
import pdf from "../pdf";

export const getAll = (state: any): DocumentDB => state[NAME];

export const getDocumentNames = createSelector(getAll, (db) => Object.keys(db));

export const getDocumentDataSets = createSelector(getAll, (db) => Object.values(db));

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
