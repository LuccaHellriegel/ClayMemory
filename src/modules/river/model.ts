import { CardField, CardOrigin, CardID } from "../cards/model";

export type RiverMakeUp = { riverID: string; cardIDs: CardID[] };

export type RiverMakeUps = { [riverID: string]: RiverMakeUp };

export type RiverShowState = "SHOW" | "HIDE";

export type RiverContentState = "ALL" | "NOTES" | "QAS";

//TODO-NICE: rename pushto/active river

// SourceCard is used when selecting/extracting from a card
export type SourceCard = { origin?: CardOrigin; sourceField: CardField };

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
	// is used to determine if we are extracting from a card
	sourceCard: SourceCard | null;
};

export const pageNumberToRiverMakeUpID = (page: number) => "CardRiver " + page;

export const riverMakeUpIDToPageNumber = (riverID: string) => parseInt(riverID.replace("CardRiver ", ""));
