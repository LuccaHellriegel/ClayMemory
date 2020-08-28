import { RiverMakeUps } from "../river/model";
import { CardConfig } from "../cards/model/model";

//TODO-NICE: find way to make this depend on the actual models of the reducers, otherwise I dont notice changes

export type ArchiveRiver = {
	riverMakeUps: RiverMakeUps;
	activeRiverMakeUpID: string;
	pushToRiverID: string;
	lastRiverIDNumber: number;
};

export type ArchiveCards = {
	cards: { [cardID: string]: CardConfig };
	lastCardIDNumber: number;
};

export type DocumentData = {
	name: string;
	currentPage: number;
	totalPages: number;
} & ArchiveRiver &
	ArchiveCards;

export type DocumentDB = { [name: string]: DocumentData };

export type DocumentDBState = { documentDB: DocumentDB };
