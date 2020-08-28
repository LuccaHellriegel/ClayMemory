import { DocumentData } from "./model";
import * as t from "./actionTypes";

export const archiveDBData = (dbData: DocumentData) => {
	return { type: t.ARCHIVE_CURRENT_DATA, payload: dbData };
};

export const loadDocumentDataSets = (dbData: DocumentData[], newActiveDataSet?: DocumentData) => {
	return { type: t.LOAD_DOCUMENT_DATA_SETS, payload: { dbData, newActiveDataSet } };
};

//TODO-NICE: might need to make my convention of always using payload as data-field obvious?

export const deleteDocumentDataSet = (document: string) => {
	return { type: t.DELETE_DOCUMENT_DATA_SET, payload: document };
};
