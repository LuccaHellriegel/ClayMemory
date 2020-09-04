import {
	DocumentDBState,
	DocumentData,
	updateDocumentDataInDocumentDB,
	updateDocumentDataSetsInDocumentDB,
	removeDocumentDataFromDocumentDB,
} from "./model";
import * as t from "./actionTypes";

const initialState: DocumentDBState = { documentDB: {} };

//TODO-NICE: PDF-date gets saved with name, better use some hash or something (rename of document file is likely) -> use size or last-modified or smth like that instead of name

const documentDB = (
	state = initialState,
	{ type, payload }: { type: string; payload: DocumentData | DocumentData[] | string | { dbData: DocumentData[] } }
): DocumentDBState => {
	switch (type) {
		// dont need to undo this, because if we change the active river and then change the document, the archive version gets overwritten
		case t.ARCHIVE_CURRENT_DATA:
			return updateDocumentDataInDocumentDB(state, payload as DocumentData);
		case t.LOAD_DOCUMENT_DATA_SETS:
			return updateDocumentDataSetsInDocumentDB(
				state,
				(payload as { dbData: DocumentData[] }).dbData as DocumentData[]
			);
		case t.DELETE_DOCUMENT_DATA_SET:
			return removeDocumentDataFromDocumentDB(state, payload as string);
		default:
			return state;
	}
};

export default documentDB;
