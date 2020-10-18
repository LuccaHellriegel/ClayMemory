import { Dispatch } from "redux";
import display from "../display";
import { ActionCreators } from "redux-undo";
import { collectCurrentDBData } from "./selectors";
import cards from "../cards";
import river from "../river";
import db from "../db";
import { DocumentData } from "../db/model";

export const archiveCurrentDBData = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const currentPDFName = display.selectors.getPDFName(state);

		if (currentPDFName !== undefined) {
			const dbData = collectCurrentDBData(state) as DocumentData;
			dispatch(db.actions.storeInDocumentDB(dbData));
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

export const resetActiveAppState = (dispatch: Dispatch) => {
	dispatch(cards.actions.resetCards());
	dispatch(river.actions.resetRivers());
};

export const replaceActiveAppState = (dispatch: Dispatch, newDocumentData: DocumentData, currentPDFName?: string) => {
	dispatch(
		cards.actions.replaceCards({ cards: newDocumentData.cards, lastCardIDNumber: newDocumentData.lastCardIDNumber })
	);
	dispatch(river.actions.replaceRivers(newDocumentData.riverMakeUps));
	if (currentPDFName !== undefined && newDocumentData.name !== currentPDFName) {
		//existing pdf is unequal to loaded data, so need to replace
		//pdf is not replaced, because when we load only data, the pdf is not yet uploaded
		dispatch(
			display.actions.loadExistingDocument(
				(({ name, currentPage, totalPages }) => ({ pdfName: name, currentPage, totalPages }))(newDocumentData)
			)
		);
	}
};

export const loadPDF = (pdf: File) => {
	return (dispatch: Dispatch, getState: Function) => {
		const newPDFName = pdf.name;

		const state = getState();
		const currentPDFName = display.selectors.getPDFName(state);

		const documentDB = db.selectors.getAll(state);

		// save current data only if pdf has been uploaded / there is an active document
		if (currentPDFName !== undefined) {
			const dbData = collectCurrentDBData(state) as DocumentData;
			dispatch(db.actions.storeInDocumentDB(dbData));
		}

		dispatch(display.actions.pdfUpload(pdf));

		// if the uploaded pdf is the same as the active one, then we just reloaded the app (lost the pdf)
		// and dont need load data (loading data would lead to overwrite because of the syncing order)
		//TODO: make the sync between documentDB and active document more explicit, right now I just sync when a PDF is uploaded
		if (newPDFName === currentPDFName) {
			return;
		}
		const newDocumentData = documentDB[newPDFName];
		if (newDocumentData) {
			replaceActiveAppState(dispatch, newDocumentData);
		} else {
			resetActiveAppState(dispatch);
		}

		// no undo-redo across documents
		dispatch(ActionCreators.clearHistory());
	};
};

export const loadSavedDocument = (document: string) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const currentPDFName = display.selectors.getPDFName(state);
		const pdf = display.selectors.getPDF(state);

		const documentDB = db.selectors.getAll(state);

		// save current data only if pdf has been uploaded / there is an active document
		if (currentPDFName !== undefined) {
			const dbData = collectCurrentDBData(state) as DocumentData;
			dispatch(db.actions.storeInDocumentDB(dbData));
		}

		const newDocumentData = documentDB[document];
		// if no pdf exists and no current pdf name then the document dataset was loaded into an empty ClayMemory,
		// then we need to set the name
		const inputName = !!!pdf && !!!currentPDFName ? "" : currentPDFName;
		replaceActiveAppState(dispatch, newDocumentData, inputName);

		// no undo-redo across documents
		dispatch(ActionCreators.clearHistory());
	};
};

export const deleteActiveDocument = () => {
	return (dispatch: Dispatch, getState: Function) => {
		resetActiveAppState(dispatch);

		// keeping the undo history leads to weird edge cases and makes no sense
		dispatch(ActionCreators.clearHistory());

		const state = getState();
		const activeDocument = display.selectors.getPDFName(state);
		// note: no undo of this
		dispatch(db.actions.removeFromDocumentDB(activeDocument as string));
	};
};

export const deleteDocument = (document: string) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();
		const activeDocument = display.selectors.getPDFName(state);
		if (activeDocument && activeDocument === document) {
			dispatch(deleteActiveDocument());
		} else {
			// note: no undo of this
			dispatch(db.actions.removeFromDocumentDB(document));
		}
	};
};
