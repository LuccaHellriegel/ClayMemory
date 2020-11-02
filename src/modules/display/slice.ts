import { DisplayData, View } from "./model";
import { simpleReducer } from "../../shared/utils";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NAME } from "./constants";
import cards from "../cards";
import { CardsState } from "../cards/model/state";
import pdf from "../pdf";

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

//TODO: suboptimal, changes to RiverExplorer also if I upload pdf,
// need to rework module boundaries to allow more fine-grained control
const viewForNewCards: CaseReducer<DisplayData, PayloadAction<CardsState>> = (state, { payload }) => {
	return { ...state, currentView: payload.lastCardIDNumber > 1 ? View.RiverExplorer : View.RiverMaterial };
};
const viewForNewPDF: CaseReducer<DisplayData> = (state) => {
	return { ...state, currentView: View.RiverMaterial };
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
		[cards.actions.allCardsReplace.type]: viewForNewCards,
		[pdf.actions.pdfUpload.type]: viewForNewPDF,
	},
});

export const { actions } = displaySlice;

export default displaySlice;
