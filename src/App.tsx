import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { ReaderScene } from "./scenes/ReaderScene";
import { pdf } from "./components/PDFUpload/PDFUploadActionsReducers";
import { section } from "./components/SectionControl/SectionControlActionsReducers";
import { SectionControlContainer } from "./components/SectionControl/SectionControl";
import { page } from "./components/ReaderControl/ReaderControlActionsReducers";
import { numPages, pageData } from "./components/Reader/ReaderActionsReducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ pdf, pageData, section, page, numPages });
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export function App() {
	return (
		<Provider store={store}>
			<SectionControlContainer></SectionControlContainer>
			<ReaderScene></ReaderScene>
		</Provider>
	);
}
