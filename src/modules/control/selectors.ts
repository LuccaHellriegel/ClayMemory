import { createSelector } from "reselect";
import display from "../display";
import river from "../river";
import cards from "../cards";
import { DocumentData } from "../db/model";

export const collectCurrentDBData: (state: any) => DocumentData | null = createSelector(
	display.selectors.getPDFName,
	river.selectors.getRiverMakeUps,
	river.selectors.getActiveRiverMakeUpID,
	river.selectors.getPushToRiver,
	river.selectors.getLastRiverIDNumber,
	cards.selectors.getCards,
	cards.selectors.getLastCardIDNumber,
	(pdfName, riverMakeUps, activeRiverMakeUpID, pushToRiverID, lastRiverIDNumber, cards, lastCardIDNumber) => {
		return {
			name: pdfName as string,
			riverMakeUps,
			activeRiverMakeUpID,
			pushToRiverID,
			lastRiverIDNumber,
			cards,
			lastCardIDNumber,
		};
	}
);
