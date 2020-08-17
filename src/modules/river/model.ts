import { CreationType } from "../cards/model";

export type RiverMakeUp = { riverID: string; cardIDs: string[]; active: boolean };

type RiverMakeUps = { [riverID: string]: RiverMakeUp };

export type RiverShowState = "SHOW" | "HIDE";

//TODO-NICE: rename pushto/active river

export type CardRiverState = {
	riverMakeUps: RiverMakeUps;
	activeRiverMakeUpID: string;
	pushToRiverID: string;
	lastRiverIDNumber: number;
	riverShowState: RiverShowState;
	hoveredCard: null | string;
	hoveredField: null | CreationType;
};

export const pageNumberToRiverMakeUpID = (page: number) => "CardRiver " + page;

export const riverMakeUpIDToPageNumber = (riverID: string) => parseInt(riverID.replace("CardRiver ", ""));
