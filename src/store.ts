import { save, load } from "redux-localstorage-simple";
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

const composeEnhancers = composeWithDevTools({ stateSanitizer });
const enhancer = composeEnhancers(
	applyMiddleware(thunk, save({ debounce: 500, ignoreStates: [analyze.constants.NAME] }))
);

export const store = createStore(rootReducer, load(), enhancer);
