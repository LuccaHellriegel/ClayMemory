import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { createTransform } from "redux-persist";
import { DisplayData, DisplayStatus } from "./modules/display/model";
import display from "./modules/display";
import { SingleOrigin } from "./modules/cards/model/model-origin";

// to get the correct object with reselect, I added .present to all getAll that belong do undoable modules

//TODO-NICE: find way to save PDF in browser, maybe manually use indexeddb and use that in transform?
// idea: make store-field pdfAsBase64 and use thunk for async-filling the field, then when reloading, use thunk to format
// const reader = new FileReaderSync();

// function readFileAsync(file: File) {
// 	return new Promise((resolve) => {
// 		reader.onload = () => {
// 			resolve(reader.result);
// 		};
// 		reader.onerror = () => resolve(null);

// 		reader.readAsDataURL(file);
// 	});
// }

const removeDOMObjectsFromDisplayData = (inboundState: DisplayData) => {
	let pdf = null;
	// if (inboundState.pdf) {
	// 	pdf = await readFileAsync(inboundState.pdf);
	// }
	const result = { ...inboundState, documentRef: null, materialData: null, pdf };
	return result;
};

//TODO-NICE: create persistable type for the state in model

const addDOMObjectsToDisplayData = (outboundState: {
	pdf: null;
	pdfName?: string;
	displayStatus: DisplayStatus;
	currentPage: number;
	scrollToPage: number | null;
	totalPages: number;
	windowMeasurements: { width: number; height: number } | null;
	spanOrigin: null | SingleOrigin;
}): DisplayData => {
	return {
		...outboundState,
		pdf: undefined,
		spanOrigin: null,
		windowMeasurements: null,
	};
};

const displayTransform = createTransform(
	(inboundState: DisplayData) => {
		return removeDOMObjectsFromDisplayData(inboundState);
	},
	(outboundState): DisplayData => {
		return addDOMObjectsToDisplayData(outboundState);
	},
	{ whitelist: [display.constants.NAME] }
);

export const persistConfig = {
	key: "root",
	storage,
	transforms: [displayTransform],
};
