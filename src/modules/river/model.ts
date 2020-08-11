export type RiverMakeUp = { riverID: string; cardIDs: string[]; active: boolean };

export type RiverMakeUps = { [riverID: string]: RiverMakeUp };

export type RiverShowState = "SHOW" | "HIDE";

export type CardRiverState = {
	riverMakeUps: RiverMakeUps;
	activeRiverMakeUpID: string;
	lastRiverIDNumber: number;
	riverShowState: RiverShowState;
};

export const pageNumberToRiverMakeUpID = (page: number) => "CardRiver " + page;
