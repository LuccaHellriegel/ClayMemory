import { CentralControl, DocumentData, DocumentDB } from "./model";
import * as t from "./actionTypes";

const initialState: CentralControl = { documentDB: {} };

//TODO-NICE: PDF-date gets saved with name, better use some hash or something (rename of document file is likely) -> use size or last-modified or smth like that instead of name

const centralControl = (
	state = initialState,
	{ type, payload }: { type: string; payload: DocumentData | DocumentData[] }
): CentralControl => {
	switch (type) {
		// dont need to undo this, because if we change the active river and then change the document, the archive version gets overwritten
		case t.ARCHIVE_CURRENT_DATA:
			return {
				...state,
				documentDB: { ...state.documentDB, [(payload as DocumentData).name]: payload as DocumentData },
			};
		case t.LOAD_DOCUMENT_DATA_SETS:
			return {
				...state,
				documentDB: {
					...state.documentDB,
					...(payload as DocumentData[]).reduce((prev, dbData) => {
						prev[dbData.name] = dbData;
						return prev;
					}, {} as DocumentDB),
				},
			};
		default:
			return state;
	}
};

export default centralControl;
