import { DisplayState, View } from "./model";
import { simpleReducer } from "../../shared/utils";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NAME } from "./constants";
import cards from "../cards";
import { CardsState } from "../cards/model/state";
import pdf from "../pdf";
import { SingleOrigin } from "../cards/model/origin";

const initialState: DisplayState = {
	topOffset: 0,
	currentView: View.RiverMaterial,
	listIndex: 0,
	scrollToPage: false,
	scrollToOriginSpan: null,
};

const topOffset: CaseReducer<DisplayState, PayloadAction<number>> = simpleReducer("topOffset");
const windowMeasurements: CaseReducer<
	DisplayState,
	PayloadAction<{ width: number; height: number } | null>
> = simpleReducer("windowMeasurements");
const listIndex: CaseReducer<DisplayState, PayloadAction<number>> = simpleReducer("listIndex");
const scrollToPage: CaseReducer<DisplayState, PayloadAction<boolean>> = simpleReducer("scrollToPage");
const scroll: CaseReducer<DisplayState> = (state) => {
	return { ...state, scrollToPage: true };
};
const scrollToOriginSpan: CaseReducer<DisplayState, PayloadAction<SingleOrigin | null>> = simpleReducer(
	"scrollToOriginSpan"
);

const currentView: CaseReducer<DisplayState, PayloadAction<View>> = simpleReducer("currentView");

//TODO: suboptimal, changes to RiverExplorer also if I upload pdf,
// need to rework module boundaries to allow more fine-grained control
const viewForNewCards: CaseReducer<DisplayState, PayloadAction<CardsState>> = (state, { payload }) => {
	return { ...state, currentView: payload.lastCardIDNumber > 1 ? View.RiverExplorer : View.RiverMaterial };
};
const viewForNewPDF: CaseReducer<DisplayState> = (state) => {
	return { ...state, currentView: View.RiverMaterial };
};

const displaySlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		topOffset,
		windowMeasurements,
		listIndex,
		scrollToPage,
		currentView,
		scrollToOriginSpan,
	},
	extraReducers: {
		[cards.actions.allCardsReplace.type]: viewForNewCards,
		[pdf.actions.pdfUpload.type]: viewForNewPDF,
		[pdf.actions.pageUpdate.type]: scroll,
		[pdf.actions.nextPage.type]: scroll,
		[pdf.actions.previousPage.type]: scroll,
		[pdf.actions.spanOrigin.type]: scroll,
	},
});

export const { actions } = displaySlice;

export default displaySlice;
