import { CardConfig } from "../cards/model";

export type RiverMakeUp = { riverID: string; cardIDs: string[]; active: boolean };

export type RiverMakeUps = { [riverID: string]: RiverMakeUp };

export type Cards = { [cardID: string]: CardConfig };

export type RiverShowState = "SHOW" | "HIDE";

export type CardRiverState = {
	riverMakeUps: RiverMakeUps;
	activeRiverMakeUpID: string;
	lastRiverIDNumber: number;
	riverShowState: RiverShowState;
};
