import { CardConfig } from "../cards/model";

export type RiverMakeUp = { id: string; cards: CardConfig[]; active: boolean };

export type RiverMakeUps = { [id: string]: RiverMakeUp };

export type CardRiverState = {
	riverMakeUps: RiverMakeUps;
	activeRiverMakeUpIDs: string[];
	lastIndex: number;
};
