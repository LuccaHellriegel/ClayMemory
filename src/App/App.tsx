import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { LayoutContainer } from "../Grid/Layout";
import { ELE_SIZE } from "../PDF/PDFMaterial";
import { FILE } from "../PDFUpload/MaterialUpload";

const store = createStore(
	gridReducer,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const initialState = {};

function gridReducer(state = initialState, action: any) {
	switch (action.type) {
		case ELE_SIZE:
			return { ...state, EleSize: action.size };
		case FILE:
			return { ...state, file: action.file };
		default:
			return state;
	}
}

function printSelection() {
	const selection = window.getSelection();
	if (selection) {
		// let node: any = selection.anchorNode;
		// while (node.nodeType !== 1) {
		// 	node = node.parentElement;
		// }
		const text = selection.toString().replace(/[\r\n\t]/g, "");
		console.log(text);
	}
}

export function App() {
	document.addEventListener("mouseup", printSelection);

	return (
		<Provider store={store}>
			<LayoutContainer></LayoutContainer>
		</Provider>
	);
}
