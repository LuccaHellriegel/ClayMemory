import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { createTransform } from "redux-persist";
import { CreationData } from "./modules/creation/model";
import { createRef } from "react";
import creation from "./modules/creation";
import { DisplayData, DisplayStatus, PerPageSpans } from "./modules/display/model";
import display from "./modules/display";

// to get the correct object with reselect, I added .present to all getAll that belong do undoable modules

const removeDOMObjectsFromCreationData = (inboundState: CreationData) => {
	return {
		...inboundState,
		menuRef: null,
		fullCardRef: null,
		qaRefs: inboundState.qaRefs.map((_) => null),
		selectedParentSpan: null,
	};
};

const addDOMObjectsToCreationData = (outboundState: {
	open: boolean;
	menuRef: null;
	fullCardRef: null;
	qaRefs: null[];
	manuallySelectedString: string;
	selectedParentSpan: null;
	selectionPosition: { x: number; y: number };
}): CreationData => {
	return {
		...outboundState,
		menuRef: createRef(),
		fullCardRef: createRef(),
		qaRefs: outboundState.qaRefs.map((_) => createRef()),
	};
};

const creationTransform = createTransform(
	(inboundState: { future: CreationData[]; past: CreationData[]; present: CreationData }) => {
		return {
			...inboundState,
			future: inboundState.future.map(removeDOMObjectsFromCreationData),
			past: inboundState.past.map(removeDOMObjectsFromCreationData),
			present: removeDOMObjectsFromCreationData(inboundState.present),
		};
	},
	(outboundState): { future: CreationData[]; past: CreationData[]; present: CreationData } => {
		return {
			...outboundState,
			future: outboundState.future.map(addDOMObjectsToCreationData),
			past: outboundState.past.map(addDOMObjectsToCreationData),
			present: addDOMObjectsToCreationData(outboundState.present),
		};
	},
	{ whitelist: [creation.constants.NAME] }
);

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
	totalPages?: number;
	//TODO-NICE:might need amount of spans per page for validation? if yes, use this
	pageSpans: PerPageSpans;
	documentRef: null;
	zoomQueue: number | null;
	materialData: null;
}): DisplayData => {
	return {
		...outboundState,
		pdf: undefined,
		documentRef: createRef(),
		materialData: { materialDataTimeStamp: -Infinity },
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
	transforms: [creationTransform, displayTransform],
};