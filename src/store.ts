import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import modules from "./modules";

const rootReducer = combineReducers({
	[modules.control.constants.NAME]: modules.control.reducer,
	[modules.cards.creation.constants.NAME]: modules.cards.creation.reducer,
	[modules.cards.river.constants.NAME]: modules.cards.river.reducer,
	[modules.material.analyze.constants.NAME]: modules.material.analyze.reducer,
	[modules.material.display.constants.NAME]: modules.material.display.reducer,
	[modules.material.select.constants.NAME]: modules.material.select.reducer,
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
