import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { ReaderScene } from "./components/ReaderScene";
import { pdf } from "./components/PDFUpload/PDFUploadActionsReducers";
import { section } from "./components/SectionControl/SectionControlActionsReducers";
import { SectionControlContainer } from "./components/SectionControl/SectionControl";
import { page } from "./components/ReaderControl/ReaderControlActionsReducers";
import { numPages, pageData } from "./components/Reader/ReaderActionsReducers";
import thunk from "redux-thunk";

// const initialState: { workbenchGrid: GridSetup } = {
// 	workbenchGrid: {
// 		nextID: 5,
// 		slot1: {
// 			slotType: "Elements",
// 			slotContent: [
// 				{ elementType: "Note", id: 0 },
// 				{ elementType: "Note", id: 4 },
// 			],
// 		},
// 		slot2: { slotType: "Elements", slotContent: [{ elementType: "QA-Card", id: 1 }] },
// 		slot3: { slotType: "Material", slotContent: "PDF" },
// 		slot4: { slotType: "Elements", slotContent: [{ elementType: "Blanks-Card", id: 3 }] },
// 	},
// };

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
