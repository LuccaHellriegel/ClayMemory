import { CardID } from "../cards/model/model";
import { CardField } from "../cards/model/model-content";

export type RiverMakeUp = { riverID: string; cardIDs: CardID[] };

export type RiverMakeUps = { [riverID: string]: RiverMakeUp };

export type RiverShowState = "SHOW" | "HIDE";

export type RiverContentState = "ALL" | "NOTES" | "QAS" | "NONE";

//TODO-NICE: rename pushto/active river

export type ContentFilter = string;

export type CardRiverState = {
	riverMakeUps: RiverMakeUps;
	activeRiverMakeUpID: string;
	pushToRiverID: string;
	lastRiverIDNumber: number;
	// show/hide river
	riverShowState: RiverShowState;
	// filter content
	riverContentState: RiverContentState;
	// this is used to determine which card should be highlighted in reaction to hovering over it in the context-menu
	highlightedCardID: null | CardID;
	highlightedCardField: null | CardField;
	contentFilter: ContentFilter | "";
};

export const pageNumberToRiverMakeUpID = (page: number) => "CardRiver " + page;

export const riverMakeUpIDToPageNumber = (riverID: string) => parseInt(riverID.replace("CardRiver ", ""));
