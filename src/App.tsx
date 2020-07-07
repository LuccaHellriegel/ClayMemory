import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { ReaderScene } from "./components/ReaderScene";
import { pdf } from "./components/PDFUpload/PDFUploadActionsReducers";
import { pdfRenderStatus } from "./components/Reader/ReaderActionsReducers";
import { pageData } from "./components/PageDataCollector/PageDataCollectorActionsReducers";
import { PageDataCollectorContainer } from "./components/PageDataCollector/PageDataCollector";
import { section } from "./components/Selector/SelectorActionsReducers";
import { SelectorContainer } from "./components/Selector/Selector";

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

const rootReducer = combineReducers({ pdf, pdfRenderStatus, pageData, section });

const store = createStore(
	rootReducer,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export function App() {
	return (
		<Provider store={store}>
			<PageDataCollectorContainer></PageDataCollectorContainer>
			<SelectorContainer></SelectorContainer>
			<ReaderScene></ReaderScene>
		</Provider>
	);
}
