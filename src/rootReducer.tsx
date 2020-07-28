import { combineReducers } from "redux";
import modules from "./modules";

export const rootReducer = combineReducers({
	[modules.control.constants.NAME]: modules.control.reducer,
	[modules.cards.creation.constants.NAME]: modules.cards.creation.reducer,
	[modules.cards.river.constants.NAME]: modules.cards.river.reducer,
	[modules.material.analyze.constants.NAME]: modules.material.analyze.reducer,
	[modules.material.display.constants.NAME]: modules.material.display.reducer,
	[modules.material.select.constants.NAME]: modules.material.select.reducer,
});
