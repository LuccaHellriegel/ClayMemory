import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ELE_SIZE } from "./scenes/workbench/workbench-grid/elements/materials/PDF/PDF";
import { FILE } from "./scenes/workbench/workbench-grid/elements/materials/PDF/PDFUpload/PDFUpload";
import { EXTRACTION_MENU_LEFTCLICK } from "./scenes/workbench/extraction-menu/menu/ExtractionMenuActions";
import { Workbench } from "./scenes/workbench/Workbench";
import { GridSetup } from "./scenes/workbench/workbench-grid/WorkbenchGrid";

const initialState: { workbenchGrid: GridSetup } = {
	workbenchGrid: {
		nextID: 5,
		slot1: {
			slotType: "Elements",
			slotContent: [
				{ elementType: "Note", id: 0 },
				{ elementType: "Note", id: 4 },
			],
		},
		slot2: { slotType: "Elements", slotContent: [{ elementType: "QA-Card", id: 1 }] },
		slot3: { slotType: "Material", slotContent: "PDF" },
		slot4: { slotType: "Elements", slotContent: [{ elementType: "Blanks-Card", id: 3 }] },
	},
};

function gridReducer(state = initialState, action: any) {
	switch (action.type) {
		case ELE_SIZE:
			return { ...state, EleSize: action.size };
		case FILE:
			return { ...state, file: action.file };
		case EXTRACTION_MENU_LEFTCLICK:
			return { ...state, mouseX: action.mouseX, mouseY: action.mouseY, selection: action.selection };
		default:
			return state;
	}
}

const store = createStore(
	gridReducer,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export function App() {
	return (
		<Provider store={store}>
			<Workbench />
		</Provider>
	);
}
