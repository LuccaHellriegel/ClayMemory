import { Dispatch } from "redux";
import display from "../display";
import { ActionCreators } from "redux-undo";
import db from "../db";
import { collectCurrentDBData } from "./selectors";
import { DocumentData } from "../db/model";
import * as t from "./actionTypes";
import { ClayMemoryPayloadAction } from "../../shared/utils";

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

export const undoActionHistory = (action: string): ClayMemoryPayloadAction => {
	return { type: t.UNDO_ACTION_HISTORY, payload: action };
};

export const redoActionHistory = (action: string): ClayMemoryPayloadAction => {
	return { type: t.REDO_ACTION_HISTORY, payload: action };
};

export const removeActionHistory = (dispatch: Dispatch) => {
	dispatch(ActionCreators.clearHistory());
	dispatch({ type: t.REMOVE_ACTION_HISTORY });
};

export const changeDocument = (pdf: File) => {
	return (dispatch: Dispatch, getState: Function) => {
		const newPDFName = pdf.name;

		const state = getState();
		const currentPDFName = display.selectors.getPDFName(state);

		const documentDB = db.selectors.getAll(state);

		// save current data only if pdf has been uploaded / there is an active document
		if (currentPDFName !== undefined) {
			const dbData = collectCurrentDBData(state) as DocumentData;
			dispatch(db.actions.archiveDBData(dbData));
		}

		dispatch(display.actions.pdfUpload(pdf));

		// if the uploaded pdf is the same as the active one, then we just reloaded the app (lost the pdf)
		// and dont need load data (loading data would lead to overwrite because of the syncing order)
		//TODO-NICE: make the sync between documentDB and active document more explicit, right now I just sync when a PDF is uploaded
		if (newPDFName === currentPDFName) {
			return;
		}
		// load new data or reset
		const newDocumentData = documentDB[newPDFName];
		if (newDocumentData) {
			dispatch(db.actions.changeDocument(newDocumentData));
		} else {
			dispatch(db.actions.changeDocument());
		}

		// no undo-redo across documents
		removeActionHistory(dispatch);
	};
};

//TODO-NICE: remove save redundancy
export const loadSavedDocument = (document: string) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const currentPDFName = display.selectors.getPDFName(state);

		const documentDB = db.selectors.getAll(state);

		// save current data only if pdf has been uploaded / there is an active document
		if (currentPDFName !== undefined) {
			const dbData = collectCurrentDBData(state) as DocumentData;
			dispatch(db.actions.archiveDBData(dbData));
		}

		// load new data
		const newDocumentData = documentDB[document];
		dispatch(db.actions.changeDocument(newDocumentData));

		// no undo-redo across documents
		removeActionHistory(dispatch);
	};
};

export const deleteDocument = (document: string) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const activeDocument = display.selectors.getPDFName(state);
		if (activeDocument && activeDocument === document) {
			// reset data
			dispatch(db.actions.changeDocument());

			// keeping the undo history leads to weird edge cases and makes no sense
			removeActionHistory(dispatch);
		}

		// note: no undo of this
		dispatch(db.actions.deleteDocumentDataSet(document));
	};
};
