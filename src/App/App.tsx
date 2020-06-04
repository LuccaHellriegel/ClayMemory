import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { LayoutContainer } from "../scenes/workbench/Grid";
import { ELE_SIZE } from "../scenes/workbench/elements/materials/PDF/PDF";
import { FILE } from "../scenes/workbench/elements/materials/PDF/PDFUpload/PDFUpload";
import {
	ExtractionMenuBracketContainer,
	ExtractionMenuContainer,
	MOUSE,
} from "../scenes/workbench/extraction-menu/ExtractionMenu";

const initialState = { mouseX: null, mouseY: null, selection: null };

export const SELECTION = "SELECTION";

function gridReducer(state = initialState, action: any) {
	switch (action.type) {
		case ELE_SIZE:
			return { ...state, EleSize: action.size };
		case FILE:
			return { ...state, file: action.file };
		case MOUSE:
			return { ...state, mouseX: action.mouseX, mouseY: action.mouseY, selection: action.selection };
		default:
			return state;
	}
}

const store = createStore(
	gridReducer,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

function selectionAction(selection: any) {
	return { selection, type: SELECTION };
}

function printSelection(dispatcher: any) {
	// const selection = window.getSelection();
	// if (selection) {
	// 	// let node: any = selection.anchorNode;
	// 	// while (node.nodeType !== 1) {
	// 	// 	node = node.parentElement;
	// 	// }
	// 	const text = selection.toString().replace(/[\r\n\t]/g, "");
	// 	dispatcher(selectionAction(text));
	// 	console.log(text);
	// }
}

export function App() {
	document.addEventListener("mouseup", () => {
		printSelection(store.dispatch);
	});

	return (
		<Provider store={store}>
			<ExtractionMenuBracketContainer>
				<LayoutContainer></LayoutContainer>
			</ExtractionMenuBracketContainer>
			<ExtractionMenuContainer></ExtractionMenuContainer>
		</Provider>
	);
}
