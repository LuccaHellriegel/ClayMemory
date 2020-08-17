import { Dispatch } from "redux";
import { getCurrentDBData, getDocumentDB } from "./selectors";
import { DocumentData } from "./model";
import display from "../display";
import cards from "../cards";
import * as t from "./actionTypes";

export const archiveDBData = (dbData: DocumentData) => {
	return { type: t.ARCHIVE_CURRENT_DATA, payload: dbData };
};

export const changeDocument = (pdf: File) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();

		const currentPDFName = display.selectors.getPDF(state).pdf?.name;
		const documentDB = getDocumentDB(state);

		//save current data only if pdf has been uploaded
		if (currentPDFName !== undefined) {
			const dbData = getCurrentDBData(getState()) as DocumentData;
			console.log(dbData);
			dispatch(archiveDBData(dbData));
		}

		dispatch(display.actions.pdfUpload(pdf));

		// load new data or reset
		const newDocumentData = documentDB[pdf.name];
		if (newDocumentData) {
			dispatch({ type: cards.actionTypes.GLOBAL_RESET, payload: newDocumentData });
		} else {
			dispatch({ type: cards.actionTypes.GLOBAL_RESET });
		}
	};
};

export const loadDocumentDataSets = (dbData: DocumentData[]) => {
	return { type: t.LOAD_DOCUMENT_DATA_SETS, payload: dbData };
};
