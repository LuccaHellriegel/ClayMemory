import { CardRiverState } from "../river/model";
import { CardsState } from "../cards/model/model-state";
import { DisplayData } from "../display/model";

export type ArchiveRiver = Pick<CardRiverState, "riverMakeUps" | "lastRiverIDNumber">;

export type ArchiveCards = Pick<CardsState, "cards" | "lastCardIDNumber">;

type ArchiveDisplay = Pick<DisplayData, "currentPage" | "totalPages">;

export type DocumentData = {
	name: string;
} & ArchiveDisplay &
	ArchiveRiver &
	ArchiveCards;

export type DocumentDB = { [name: string]: DocumentData };

export type DocumentDBState = { documentDB: DocumentDB };

export const updateDocumentDataInDocumentDB = (state: DocumentDBState, documentData: DocumentData): DocumentDBState => {
	return {
		...state,
		documentDB: { ...state.documentDB, [documentData.name]: documentData },
	};
};

export const updateDocumentDataSetsInDocumentDB = (
	state: DocumentDBState,
	documentDataSets: DocumentData[]
): DocumentDBState => {
	return {
		...state,
		documentDB: {
			...state.documentDB,
			...documentDataSets.reduce((prev, dbData) => {
				prev[dbData.name] = dbData;
				return prev;
			}, {} as DocumentDB),
		},
	};
};

export const removeDocumentDataFromDocumentDB = (state: DocumentDBState, document: string): DocumentDBState => {
	return {
		...state,
		documentDB: Object.fromEntries(Object.entries(state.documentDB).filter((arr) => arr[0] !== document)),
	};
};
