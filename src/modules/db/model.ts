import { CardRiverState } from "../river/model";
import { CardsState } from "../cards/model/state";
import { DisplayData } from "../display/model";

export type ArchiveRiver = Pick<CardRiverState, "riverMakeUps">;

type ArchiveDisplay = Pick<DisplayData, "currentPage" | "totalPages">;

export type DocumentData = {
	name: string;
} & ArchiveDisplay &
	ArchiveRiver &
	CardsState;

export type DocumentDB = { [name: string]: DocumentData };

export const updateDocumentDataInDocumentDB = (state: DocumentDB, documentData: DocumentData): DocumentDB => {
	return { ...state, [documentData.name]: documentData };
};

export const updateDocumentDataSetsInDocumentDB = (state: DocumentDB, documentDataSets: DocumentData[]): DocumentDB => {
	return {
		...state,
		...documentDataSets.reduce((prev, dbData) => {
			prev[dbData.name] = dbData;
			return prev;
		}, {} as DocumentDB),
	};
};

export const removeDocumentDataFromDocumentDB = (state: DocumentDB, document: string): DocumentDB => {
	return Object.fromEntries(Object.entries(state).filter((arr) => arr[0] !== document));
};
