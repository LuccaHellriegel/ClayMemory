import { Dispatch } from "redux";
import display from "../display";
import { ActionCreators } from "redux-undo";
import db from "../db";
import { collectCurrentDBData } from "./selectors";
import { DocumentData } from "../db/model";

export const archiveCurrentDBData = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const currentPDFName = display.selectors.getPDFName(state);

		if (currentPDFName !== undefined) {
			const dbData = collectCurrentDBData(state) as DocumentData;
			dispatch(db.actions.archiveDBData(dbData));
		}
	};
};

const fileDownload = require("js-file-download");
export const downloadDBData = () => {
	return (dispatch: any, getState: Function) => {
		//actualize the db before downloading
		dispatch(archiveCurrentDBData());

		const documentDataSets = db.selectors.getDocumentDataSets(getState());
		const localString = new Date().toLocaleString();
		fileDownload(JSON.stringify(documentDataSets), localString + " ClayMemory.txt");
	};
};

export const changeDocument = (pdf: File) => {
	return (dispatch: Dispatch, getState: Function) => {
		const newPDFName = pdf.name;

		const state = getState();
		const currentPDFName = display.selectors.getPDFName(state);

		const documentDB = db.selectors.getDocumentDB(state);

		// save current data only if pdf has been uploaded / there is an active document
		if (currentPDFName !== undefined) {
			const dbData = collectCurrentDBData(state) as DocumentData;
			dispatch(db.actions.archiveDBData(dbData));
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
			dispatch({ type: db.actionTypes.DOCUMENT_CHANGE, payload: newDocumentData });
		} else {
			dispatch({ type: db.actionTypes.DOCUMENT_CHANGE });
		}

		// no undo-redo across documents
		dispatch(ActionCreators.clearHistory());
	};
};

//TODO-NICE: remove save redundancy
export const loadSavedDocument = (document: string) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const currentPDFName = display.selectors.getPDFName(state);

		const documentDB = db.selectors.getDocumentDB(state);

		// save current data only if pdf has been uploaded / there is an active document
		if (currentPDFName !== undefined) {
			const dbData = collectCurrentDBData(state) as DocumentData;
			dispatch(db.actions.archiveDBData(dbData));
		}

		// load new data
		const newDocumentData = documentDB[document];
		dispatch({ type: db.actionTypes.DOCUMENT_CHANGE, payload: newDocumentData });

		// no undo-redo across documents
		dispatch(ActionCreators.clearHistory());
	};
};

export const deleteDocument = (document: string) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const activeDocument = display.selectors.getPDFName(state);
		if (activeDocument && activeDocument === document) {
			// reset data
			dispatch({ type: db.actionTypes.DOCUMENT_CHANGE });

			// keeping the undo history leads to weird edge cases and makes no sense
			dispatch(ActionCreators.clearHistory());
		}

		// note: no undo of this
		dispatch(db.actions.deleteDocumentDataSet(document));
	};
};
