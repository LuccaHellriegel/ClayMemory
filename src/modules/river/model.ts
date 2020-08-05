import { CardConfig } from "../cards/model";

export type RiverMakeUp = { riverID: string; cards: CardConfig[]; active: boolean };

export type RiverMakeUps = { [riverID: string]: RiverMakeUp };

export type Cards = { [cardID: string]: CardConfig };

export type CardRiverState = {
	riverMakeUps: RiverMakeUps;
	activeRiverMakeUpIDs: string[];
	lastIndex: number;
};
