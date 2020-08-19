import { DocumentData } from "./model";
import * as t from "./actionTypes";

export const archiveDBData = (dbData: DocumentData) => {
	return { type: t.ARCHIVE_CURRENT_DATA, payload: dbData };
};

export const loadDocumentDataSets = (dbData: DocumentData[]) => {
	return { type: t.LOAD_DOCUMENT_DATA_SETS, payload: dbData };
};
