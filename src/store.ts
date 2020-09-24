import { createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import river from "./modules/river";
import display from "./modules/display";
import cards from "./modules/cards";
import { persistStore, persistReducer } from "redux-persist";
import undoable, { includeAction } from "redux-undo";
import { persistConfig } from "./persist";
import db from "./modules/db";
import selection from "./modules/selection";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import control from "./modules/control";
import { cardsShield, dbShield, riverShield, selectionShield } from "./modules/control/model";

//TODO-NICE: make limit for undo (right now its fine, if we reset on document-upload / reload)
//TODO-NICE: make snackbar for which action is undone/redone

const rootReducer = combineReducers({
	[control.constants.NAME]: control.reducer,
	[selection.constants.NAME]: selectionShield(
		undoable(selection.reducer, {
			filter: includeAction(control.model.selectionActions),
			limit: 15,
		})
	),
	[river.constants.NAME]: riverShield(
		undoable(river.reducer, {
			filter: includeAction(control.model.riverActions),
			limit: 15,
		})
	),
	[display.constants.NAME]: display.reducer,
	[cards.constants.NAME]: cardsShield(
		undoable(cards.reducer, {
			filter: includeAction(control.model.cardActions),
			limit: 15,
		})
	),
	[db.constants.NAME]: dbShield(
		undoable(db.reducer, {
			filter: includeAction(control.model.dbActions),
			limit: 15,
		})
	),
});

const stateSanitizer = (state: any) => {
	return state.displayData.pdf ? { ...state, displayData: { ...state.displayData, pdf: "PDF_FILE_IS_HERE" } } : state;
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = composeWithDevTools({ stateSanitizer });
const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);
