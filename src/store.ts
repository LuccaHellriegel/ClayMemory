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

//TODO: make limit for undo (right now its fine, if we reset on document-upload / reload)
//TODO: make snackbar for which action is undone/redone

const undoableCardActions = [
	cards.actions.cardPush.type,
	cards.actions.cardRemove.type,
	cards.actions.cardReplace.type,
	cards.actions.cardFieldReplace.type,
];

const rootReducer = combineReducers({
	[db.name]: db.reducer,
	[selection.constants.NAME]: selection.reducer,
	[river.constants.NAME]: undoable(river.reducer, {
		filter: includeAction(undoableCardActions),
	}),
	[cards.name]: undoable(cards.reducer, {
		filter: includeAction(undoableCardActions),
	}),
	[display.constants.NAME]: display.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = composeWithDevTools({});
const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);
