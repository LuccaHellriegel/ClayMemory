import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { ReaderScene } from "./scenes/ReaderScene";
import { pdf } from "./components/PDFUpload/PDFUploadActionsReducers";
import { section } from "./components/Control/ControlActionsReducers";
import { ControlContainer } from "./components/Control/Control";
import { page } from "./components/ReaderControl/ReaderControlActionsReducers";
import { numPages, pageData } from "./components/Reader/ReaderActionsReducers";
import thunk from "redux-thunk";

const stateSanitizer = (state: any) => {
	let newState = state.pdf ? { ...state, pdf: "PDF_FILE_IS_HERE" } : state;
	return newState.pageData.spanGroups
		? {
				...newState,
				pageData: {
					spanGroups: newState.pageData.spanGroups.length,
					boundingRects: newState.pageData.boundingRectGroups.length,
				},
		  }
		: newState;
};

const composeEnhancers = composeWithDevTools({ stateSanitizer });
const enhancer = composeEnhancers(applyMiddleware(thunk));

const rootReducer = combineReducers({ pdf, pageData, section, page, numPages });
const store = createStore(rootReducer, enhancer);

export function App() {
	return (
		<Provider store={store}>
			<ControlContainer></ControlContainer>
			<ReaderScene></ReaderScene>
		</Provider>
	);
}
