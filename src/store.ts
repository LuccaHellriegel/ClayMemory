import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import focus from "./modules/focus";
import creation from "./modules/creation";
import river from "./modules/river";
import analyze from "./modules/analyze";
import display from "./modules/display";
import select from "./modules/select";
import cards from "./modules/cards";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { CreationData } from "./modules/creation/model";
import { createRef } from "react";
import { DisplayData } from "./modules/display/model";

const rootReducer = combineReducers({
	[focus.constants.NAME]: focus.reducer,
	[creation.constants.NAME]: creation.reducer,
	[river.constants.NAME]: river.reducer,
	[analyze.constants.NAME]: analyze.reducer,
	[display.constants.NAME]: display.reducer,
	[select.constants.NAME]: select.reducer,
	[cards.constants.NAME]: cards.reducer,
});

const stateSanitizer = (state: any) => {
	let newState = state.displayData.pdf
		? { ...state, displayData: { ...state.displayData, pdf: "PDF_FILE_IS_HERE" } }
		: state;
	return newState.materialData
		? {
				...newState,
				materialData: "MATERIAL_DATA_IS_HERE",
		  }
		: newState;
};

const creationTransform = createTransform(
	(inboundState: CreationData) => {
		return { ...inboundState, menuRef: null, qaRefs: inboundState.qaRefs.map((_) => null) };
	},
	(outboundState): CreationData => {
		return { ...outboundState, menuRef: createRef(), qaRefs: outboundState.qaRefs.map((_) => createRef()) };
	},
	{ whitelist: [creation.constants.NAME] }
);
const displayTransform = createTransform(
	(inboundState: DisplayData) => {
		return { ...inboundState, pdf: null, documentRef: null };
	},
	(outboundState): DisplayData => {
		return { ...outboundState, pdf: undefined, documentRef: createRef() };
	},
	{ whitelist: [display.constants.NAME] }
);

const persistConfig = {
	key: "root",
	storage,
	blacklist: [analyze.constants.NAME],
	transforms: [creationTransform, displayTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//TODO: write my own persister, this surface-level does not work
const composeEnhancers = composeWithDevTools({ stateSanitizer });
const enhancer = composeEnhancers(
	applyMiddleware(
		thunk
		//save({ debounce: 500, ignoreStates: [analyze.constants.NAME, creation.constants.NAME, display.constants.NAME] })
	)
);

export const store = createStore(
	persistedReducer, //load(),
	enhancer
);

export const persistor = persistStore(store);
