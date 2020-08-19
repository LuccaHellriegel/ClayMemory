import { CardField, CardOrigin } from "../cards/model";

export type RiverMakeUp = { riverID: string; cardIDs: string[] };

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
	riverShowState: RiverShowState;
	riverContentState: RiverContentState;
	hoveredCard: null | string;
	hoveredField: null | CardField;
	sourceCard: SourceCard | null;
};

export const pageNumberToRiverMakeUpID = (page: number) => "CardRiver " + page;

export const riverMakeUpIDToPageNumber = (riverID: string) => parseInt(riverID.replace("CardRiver ", ""));
