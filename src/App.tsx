import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { ReaderScene } from "./scenes/ReaderScene";
import { pdf, PDF_UPLOADED } from "./components/PDFUpload/PDFUploadActionsReducers";
import { section } from "./components/SectionControl/SectionControlActionsReducers";
import { SectionControlContainer } from "./components/SectionControl/SectionControl";
import { page } from "./components/ReaderControl/ReaderControlActionsReducers";
import { numPages, pageData, PAGE_DATA } from "./components/Reader/ReaderActionsReducers";
import thunk from "redux-thunk";

const actionSanitizer = (action: any) => {
	switch (action.type) {
		case PDF_UPLOADED:
			return { ...action, pdf: "PDF_FILE_IS_HERE" };
		case PAGE_DATA:
			return { ...action, pageData: "PAGE_DATA_IS_HERE" };
		default:
			return action;
	}
};

const stateSanitizer = (state: any) => {
	let newState = state.pdf ? { ...state, pdf: "PDF_FILE_IS_HERE" } : state;
	return newState.pageData.spanGroups ? { ...newState, pageData: "PAGE_DATA_IS_HERE" } : newState;
};

const composeEnhancers = composeWithDevTools({ actionSanitizer, stateSanitizer });
const enhancer = composeEnhancers(applyMiddleware(thunk));

const rootReducer = combineReducers({ pdf, pageData, section, page, numPages });
const store = createStore(rootReducer, enhancer);

export function App() {
	return (
		<Provider store={store}>
			<SectionControlContainer></SectionControlContainer>
			<ReaderScene></ReaderScene>
		</Provider>
	);
}
