import { CentralControl, DocumentData } from "./model";
import * as t from "./actionTypes";

const initialState: CentralControl = { documentDB: {} };

//TODO-NICE: PDF-date gets saved with name, better use some hash or something (rename of document file is likely) -> use size or last-modified or smth like that instead of name

const centralControl = (
	state = initialState,
	{ type, payload }: { type: string; payload: DocumentData }
): CentralControl => {
	switch (type) {
		case t.ARCHIVE_CURRENT_DATA:
			return { ...state, documentDB: { ...state.documentDB, [payload.name]: payload } };
		default:
			return state;
	}
};

export default centralControl;
