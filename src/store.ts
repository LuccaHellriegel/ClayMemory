import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import creation from "./modules/extraction";
import river from "./modules/river";
import display from "./modules/display";
import cards from "./modules/cards";
import { persistStore, persistReducer } from "redux-persist";
import undoable, { includeAction } from "redux-undo";
import { persistConfig } from "./persist";
import db from "./modules/db";
import selection from "./modules/selection";

//TODO-NICE: make limit for undo (right now its fine, if we reset on document-upload)
//TODO-NICE: make snackbar for which action is undone/redone
//TODO-NICE: this undo-buisness is not very transparent, I just list each action that is state-relevant and not view, make action list in constants.ts?

//TODO-NICE: can undo selected-string but then the source-card might still be set
// I think this is not a problem, because then when something else is selected the old-source-Card is overwritten
// but not as clean as it could be

const rootReducer = combineReducers({
	[selection.constants.NAME]: undoable(selection.reducer, {
		filter: includeAction([selection.actionTypes.SELECTED_STRING]),
	}),
	[creation.constants.NAME]: undoable(creation.reducer, {
		filter: includeAction([cards.actionTypes.CARD_PUSH]),
	}),
	[river.constants.NAME]: undoable(river.reducer, {
		filter: includeAction([
			cards.actionTypes.CARD_PUSH,
			cards.actionTypes.CARD_REMOVE,
			db.actionTypes.LOAD_DOCUMENT_DATA_SETS,
		]),
	}),
	[display.constants.NAME]: display.reducer,
	[cards.constants.NAME]: undoable(cards.reducer, {
		filter: includeAction([
			db.actionTypes.LOAD_DOCUMENT_DATA_SETS,
			cards.actionTypes.CARD_PUSH,
			cards.actionTypes.CARD_UPDATE,
			cards.actionTypes.CARD_REMOVE,
			//this needs to be here, because we use display it to the user with the grab-icon
			cards.actionTypes.CARD_GOAL,
		]),
	}),
	[db.constants.NAME]: undoable(db.reducer, {
		filter: includeAction([db.actionTypes.LOAD_DOCUMENT_DATA_SETS]),
	}),
});

const stateSanitizer = (state: any) => {
	return state.displayData.pdf ? { ...state, displayData: { ...state.displayData, pdf: "PDF_FILE_IS_HERE" } } : state;
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = composeWithDevTools({ stateSanitizer });
const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);
