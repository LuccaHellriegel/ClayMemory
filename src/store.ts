import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import focus from "./modules/focus";
import creation from "./modules/creation";
import river from "./modules/river";
import display from "./modules/display";
import cards from "./modules/cards";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import { CreationData } from "./modules/creation/model";
import { createRef } from "react";
import { DisplayData } from "./modules/display/model";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
	[focus.constants.NAME]: focus.reducer,
	[creation.constants.NAME]: creation.reducer,
	[river.constants.NAME]: river.reducer,
	[display.constants.NAME]: display.reducer,
	[cards.constants.NAME]: cards.reducer,
});

const stateSanitizer = (state: any) => {
	return state.displayData.pdf ? { ...state, displayData: { ...state.displayData, pdf: "PDF_FILE_IS_HERE" } } : state;
};

const creationTransform = createTransform(
	(inboundState: CreationData) => {
		return { ...inboundState, menuRef: null, qaRefs: inboundState.qaRefs.map((_) => null), selectedParentSpan: null };
	},
	(outboundState): CreationData => {
		return { ...outboundState, menuRef: createRef(), qaRefs: outboundState.qaRefs.map((_) => createRef()) };
	},
	{ whitelist: [creation.constants.NAME] }
);

//TODO-NICE: find way to save PDF in browser, maybe manually use indexeddb and use that in transform?
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

const displayTransform = createTransform(
	(inboundState: DisplayData) => {
		let pdf = null;
		// if (inboundState.pdf) {
		// 	pdf = await readFileAsync(inboundState.pdf);
		// }
		const result = { ...inboundState, documentRef: null, materialData: null, pdf };
		return result;
	},
	(outboundState): DisplayData => {
		return {
			...outboundState,
			pdf: undefined,
			documentRef: createRef(),
			materialData: { materialDataTimeStamp: -Infinity },
		};
	},
	{ whitelist: [display.constants.NAME] }
);

const persistConfig = {
	key: "root",
	storage, //: storage("ClayMemory"),
	transforms: [creationTransform, displayTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = composeWithDevTools({ stateSanitizer });
const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);
