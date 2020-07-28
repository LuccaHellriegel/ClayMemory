import React from "react";
import ReactDOM from "react-dom";
import { ReaderScene } from "./scenes/ReaderScene";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ReaderScene></ReaderScene>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
