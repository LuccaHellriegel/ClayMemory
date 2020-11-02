import { DisplayData, View } from "./model";
import { simpleReducer } from "../../shared/utils";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NAME } from "./constants";
import cards from "../cards";

const initialState: DisplayData = {
	windowMeasurements: null,
	topOffset: 0,
	currentView: View.RiverMaterial,
};

const topOffset: CaseReducer<DisplayData, PayloadAction<number>> = simpleReducer("topOffset");
const windowMeasurements: CaseReducer<
	DisplayData,
	PayloadAction<{ width: number; height: number } | null>
> = simpleReducer("windowMeasurements");
const currentView: CaseReducer<DisplayData, PayloadAction<View>> = simpleReducer("currentView");
const explorerView: CaseReducer<DisplayData> = (state) => {
	return { ...state, currentView: View.RiverExplorer };
};

const displaySlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		topOffset,
		windowMeasurements,
		currentView,
	},
	extraReducers: {
		[cards.actions.allCardsReplace.type]: explorerView,
	},
});

export const { actions } = displaySlice;

export default displaySlice;
