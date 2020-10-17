import { DocumentData } from "./model";
import * as t from "./actionTypes";
import { ClayMemoryPayloadAction } from "../../shared/utils";

export const archiveDBData = (dbData: DocumentData): ClayMemoryPayloadAction => {
	return { type: t.ARCHIVE_CURRENT_DATA, payload: dbData };
};

export const loadDocumentDataSets = (dbData: DocumentData[]): ClayMemoryPayloadAction => {
	return { type: t.LOAD_DOCUMENT_DATA_SETS, payload: { dbData } };
};

export const deleteDocumentDataSet = (document: string): ClayMemoryPayloadAction => {
	return { type: t.DELETE_DOCUMENT_DATA_SET, payload: document };
};
