import { createSelector } from "reselect";
import display from "../display";
import river from "../river";
import cards from "../cards";
import { DocumentData, CentralControl } from "./model";
import { NAME } from "./constants";

export const getAll = (state: any) => state[NAME];

export const getDocumentDB = createSelector(getAll, (state: CentralControl) => state.documentDB);

export const getDocumentNames = createSelector(getDocumentDB, (db) => Object.keys(db));

export const getDocumentDataSets = createSelector(getDocumentDB, (db) => Object.values(db));

export const getCurrentDBData: (state: any) => DocumentData | null = createSelector(
	display.selectors.getPDF,
	river.selectors.getRiverMakeUps,
	river.selectors.getActiveRiverMakeUpID,
	river.selectors.getPushToRiver,
	river.selectors.getLastRiverIDNumber,
	cards.selectors.getCards,
	cards.selectors.getLastCardIDNumber,
	(pdf, riverMakeUps, activeRiverMakeUpID, pushToRiverID, lastRiverIDNumber, cards, lastCardIDNumber) => {
		return {
			name: (pdf.pdf as File).name,
			riverMakeUps,
			activeRiverMakeUpID,
			pushToRiverID,
			lastRiverIDNumber,
			cards,
			lastCardIDNumber,
		};
	}
);
