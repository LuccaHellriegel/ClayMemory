import { Dispatch } from "redux";
import pdf from "../pdf";
import { DocumentData } from "./model";
import { collectCurrentDBData, getDocumentDataSets } from "./selectors";
import { actions } from "./slice";

export const refreshDB = (dispatch: Dispatch, state: any) => {
	// note: need to getState again after this to make sure refreshed state is used
	const currentPDFName = pdf.selectors.getPDFName(state);
	if (currentPDFName !== undefined) {
		const dbData = collectCurrentDBData(state) as DocumentData;
		dispatch(actions.storeInDocumentDB(dbData));
	}
};

const fileDownload = require("js-file-download");
export const downloadDBData = () => {
	return (dispatch: Dispatch, getState: Function) => {
		let state = getState();

		//actualize the db before downloading
		refreshDB(dispatch, state);
		// get actualized state
		state = getState();

		const documentDataSets = getDocumentDataSets(state);
		const localString = new Date().toLocaleString();
		fileDownload(JSON.stringify(documentDataSets), localString + " ClayMemory.txt");
	};
};
