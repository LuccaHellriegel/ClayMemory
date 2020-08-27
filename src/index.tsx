import React from "react";
import ReactDOM from "react-dom";
import { ReaderScene } from "./scenes/ReaderScene";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/es/integration/react";
// Load Roboto typeface
require("typeface-roboto");

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ReaderScene></ReaderScene>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
