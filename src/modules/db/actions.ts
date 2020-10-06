import { DocumentData } from "./model";
import * as t from "./actionTypes";
import { ClayMemoryPayloadAction } from "../../shared/utils";

export const archiveDBData = (dbData: DocumentData): ClayMemoryPayloadAction => {
	return { type: t.ARCHIVE_CURRENT_DATA, payload: dbData };
};

export const loadDocumentDataSets = (
	dbData: DocumentData[],
	newActiveDataSet?: DocumentData
): ClayMemoryPayloadAction => {
	return { type: t.LOAD_DOCUMENT_DATA_SETS, payload: { dbData, newActiveDataSet } };
};

export const deleteDocumentDataSet = (document: string): ClayMemoryPayloadAction => {
	return { type: t.DELETE_DOCUMENT_DATA_SET, payload: document };
};

export const changeDocument = (payload?: DocumentData): ClayMemoryPayloadAction => {
	return { type: t.DOCUMENT_CHANGE, payload };
};
