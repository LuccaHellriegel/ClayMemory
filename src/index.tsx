import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/es/integration/react";
import display from "./modules/display";
// Load Roboto typeface
require("typeface-roboto");

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<display.components.Display></display.components.Display>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
