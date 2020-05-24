import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { gridReducer } from "./reducers";
import { LayoutContainer } from "./grid/Layout";

const store = createStore(
	gridReducer,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export function App() {
	return (
		<Provider store={store}>
			<LayoutContainer></LayoutContainer>
		</Provider>
	);
}
