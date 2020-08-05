import { CardConfig } from "../cards/model";

export type RiverMakeUp = { riverID: string; cardIDs: string[]; active: boolean };

export type RiverMakeUps = { [riverID: string]: RiverMakeUp };

export type Cards = { [cardID: string]: CardConfig };

export type CardRiverState = {
	riverMakeUps: RiverMakeUps;
	activeRiverMakeUpIDs: string[];
	lastRiverIDNumber: number;
};

export type RiverCards = { [riverID: string]: { [cardID: string]: CardConfig } };
