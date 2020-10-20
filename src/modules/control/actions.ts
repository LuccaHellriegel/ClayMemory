import { Dispatch } from "redux";
import { ActionCreators } from "redux-undo";
import cards from "../cards";
import river from "../river";
import db from "../db";
import { DocumentData } from "../db/model";
import pdf from "../pdf";

const resetActiveAppState = (dispatch: Dispatch) => {
	// reset river first, otherwise it might not find cards which where deleted
	dispatch(river.actions.allRiversReset());
	dispatch(cards.actions.allCardsReset());
	// no undo-redo across documents or when uploading a dataset
	dispatch(ActionCreators.clearHistory());
};

export const replaceActiveAppState = (dispatch: Dispatch, newDocumentData: DocumentData, currentPDFName?: string) => {
	// this order is critical, otherwise river cant find cards
	dispatch(
		cards.actions.allCardsReplace({ cards: newDocumentData.cards, lastCardIDNumber: newDocumentData.lastCardIDNumber })
	);
	dispatch(river.actions.allRiversReplace(newDocumentData.riverMakeUps));
	if (currentPDFName !== undefined && newDocumentData.name !== currentPDFName) {
		//existing pdf is unequal to loaded data, so need to replace
		//pdf is not replaced, because when we load only data, the pdf is not yet uploaded
		dispatch(
			pdf.actions.existingDocumentPayload({
				pdfName: newDocumentData.name,
				currentPage: newDocumentData.currentPage,
				totalPages: newDocumentData.totalPages,
			})
		);
	}
	// no undo-redo across documents or when uploading a dataset
	dispatch(ActionCreators.clearHistory());
};

export const loadPDF = (pdfFile: File) => {
	return (dispatch: Dispatch, getState: Function) => {
		const newPDFName = pdfFile.name;

		const state = getState();
		const currentPDFName = pdf.selectors.getPDFName(state);

		const documentDB = db.selectors.getAll(state);

		db.actions.refreshDB(dispatch, state);

		dispatch(pdf.actions.pdfUpload(pdfFile));

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
	};
};

export const loadSavedDocument = (document: string) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const currentPDFName = pdf.selectors.getPDFName(state);
		const pdfFile = pdf.selectors.getPDF(state);

		const documentDB = db.selectors.getAll(state);

		db.actions.refreshDB(dispatch, state);

		const newDocumentData = documentDB[document];
		// if no pdf exists and no current pdf name then the document dataset was loaded into an empty ClayMemory,
		// then we need to set the name
		const inputName = !!!pdfFile && !!!currentPDFName ? "" : currentPDFName;
		replaceActiveAppState(dispatch, newDocumentData, inputName);
	};
};

export const deleteActiveDocument = () => {
	return (dispatch: Dispatch, getState: Function) => {
		resetActiveAppState(dispatch);
		const state = getState();
		const activeDocument = pdf.selectors.getPDFName(state);
		dispatch(db.actions.removeFromDocumentDB(activeDocument as string));
	};
};

export const deleteDocument = (document: string) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();
		const activeDocument = pdf.selectors.getPDFName(state);
		if (activeDocument && activeDocument === document) {
			dispatch(deleteActiveDocument());
		} else {
			dispatch(db.actions.removeFromDocumentDB(document));
		}
	};
};
