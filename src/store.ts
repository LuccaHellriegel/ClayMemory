import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import control from "./modules/control";
import creation from "./modules/cards/creation";
import river from "./modules/cards/river";
import analyze from "./modules/material/analyze";
import display from "./modules/material/display";
import select from "./modules/material/select";

const rootReducer = combineReducers({
	[control.constants.NAME]: control.reducer,
	[creation.constants.NAME]: creation.reducer,
	[river.constants.NAME]: river.reducer,
	[analyze.constants.NAME]: analyze.reducer,
	[display.constants.NAME]: display.reducer,
	[select.constants.NAME]: select.reducer,
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
const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
