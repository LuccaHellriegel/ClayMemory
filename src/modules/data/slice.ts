import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData, DocumentDB } from "./model";
import { NAME } from "./constants";

//TODO: PDF-data gets saved with name, better use some hash or something (rename of document file is likely) -> use size or last-modified or smth like that instead of name

const storeInDocumentDB: CaseReducer<DocumentDB, PayloadAction<DocumentData>> = (state, { payload }) => {
	return { ...state, [payload.name]: payload };
};

const updateDocumentDB: CaseReducer<DocumentDB, PayloadAction<DocumentData[]>> = (state, { payload }) => {
	return {
		...state,
		...payload.reduce((prev, dbData) => {
			prev[dbData.name] = dbData;
			return prev;
		}, {} as DocumentDB),
	};
};

const removeFromDocumentDB: CaseReducer<DocumentDB, PayloadAction<string>> = (state, { payload }) => {
	return Object.fromEntries(Object.entries(state).filter((arr) => arr[0] !== payload));
};

const initialState: DocumentDB = {};

const dbSlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		storeInDocumentDB,
		removeFromDocumentDB,
		updateDocumentDB,
	},
});

export const { actions } = dbSlice;

export default dbSlice;
