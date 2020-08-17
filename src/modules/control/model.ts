import { RiverMakeUps } from "../river/model";
import { CardConfig } from "../cards/model";

//TODO-NICE: find way to make this depend on the actual models of the reducers, otherwise I dont notice changes

export type CentralControlRiver = {
	riverMakeUps: RiverMakeUps;
	activeRiverMakeUpID: string;
	pushToRiverID: string;
	lastRiverIDNumber: number;
};

export type CentralControlCards = {
	cards: { [cardID: string]: CardConfig };
	lastCardIDNumber: number;
};

export type DocumentData = {
	name: string;
} & CentralControlRiver &
	CentralControlCards;

export type CentralControl = { documentDB: { [name: string]: DocumentData } };
