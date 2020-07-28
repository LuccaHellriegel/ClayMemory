import { createStore } from "redux";
import { rootReducer } from "./rootReducer";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

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
