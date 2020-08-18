import { Dispatch } from "redux";
import { getCurrentDBData, getDocumentDB, getDocumentDataSets } from "./selectors";
import { DocumentData } from "./model";
import display from "../display";
import cards from "../cards";
import * as t from "./actionTypes";

export const archiveDBData = (dbData: DocumentData) => {
	return { type: t.ARCHIVE_CURRENT_DATA, payload: dbData };
};

export const archiveCurrentDBData = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const currentPDFName = display.selectors.getPDFName(state);

		if (currentPDFName !== undefined) {
			const dbData = getCurrentDBData(state) as DocumentData;
			dispatch(archiveDBData(dbData));
		}
	};
};

const fileDownload = require("js-file-download");
export const downloadDBData = () => {
	return (dispatch: any, getState: Function) => {
		//actualize the db before downloading
		dispatch(archiveCurrentDBData());

		const documentDataSets = getDocumentDataSets(getState());
		const localString = new Date().toLocaleString();
		fileDownload(JSON.stringify(documentDataSets), localString + " ClayMemory.txt");
	};
};

//TODO-RC: dont count selection if it is just two letters?

export const changeDocument = (pdf: File) => {
	return (dispatch: Dispatch, getState: Function) => {
		const newPDFName = pdf.name;

		const state = getState();
		const currentPDFName = display.selectors.getPDFName(state);

		const documentDB = getDocumentDB(state);

		// save current data only if pdf has been uploaded / there is an active document
		if (currentPDFName !== undefined) {
			const dbData = getCurrentDBData(state) as DocumentData;
			dispatch(archiveDBData(dbData));
		}

		dispatch(display.actions.pdfUpload(pdf));

		// if the uploaded pdf is the same as the active one, then we just reloaded the app (lost the pdf)
		// and dont need load data (loading data would lead to overwrite because of the syncing order)
		//TODO-NICE: make the sync between documentDB and active document for explicit, right now I just sync when a PDF is uploaded
		if (newPDFName === currentPDFName) {
			return;
		}
		// load new data or reset
		const newDocumentData = documentDB[newPDFName];
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
